'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Course, Flashcard, QuizQuestion, UserCourse } from '@/lib/types';
import {
  ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle,
  BookOpen, Award, ChevronLeft, ChevronRight, Loader2,
  Star, Clock, Target, Trophy, Lock, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Phase = 'overview' | 'flashcards' | 'quiz' | 'results';

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { profile, organisation, isIndividual } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [prerequisiteCourse, setPrerequisiteCourse] = useState<Course | null>(null);
  const [prerequisitePassed, setPrerequisitePassed] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>('overview');

  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Quiz state
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [autoCertIssued, setAutoCertIssued] = useState(false);

  useEffect(() => {
    if (!profile || !courseId) return;
    const load = async () => {
      const [courseRes, flashRes, quizRes, ucRes] = await Promise.all([
        supabase.from('courses').select('*').eq('id', courseId).maybeSingle(),
        supabase.from('flashcards').select('*').eq('course_id', courseId).order('order_index'),
        supabase.from('quiz_questions').select('*').eq('course_id', courseId),
        supabase.from('user_courses').select('*').eq('user_id', profile.id).eq('course_id', courseId).maybeSingle(),
      ]);

      const courseData = courseRes.data as Course;
      setCourse(courseData);
      setFlashcards(flashRes.data as Flashcard[] ?? []);
      setQuestions(quizRes.data as QuizQuestion[] ?? []);
      setUserCourse(ucRes.data as UserCourse);

      // Check prerequisite
      if (courseData?.prerequisite_course_id) {
        const [prereqRes, prereqUcRes] = await Promise.all([
          supabase.from('courses').select('id, title').eq('id', courseData.prerequisite_course_id).maybeSingle(),
          supabase.from('user_courses').select('status').eq('user_id', profile.id).eq('course_id', courseData.prerequisite_course_id).maybeSingle(),
        ]);
        setPrerequisiteCourse(prereqRes.data as Course);
        setPrerequisitePassed(prereqUcRes.data?.status === 'passed');
      }

      setLoading(false);
    };
    load();
  }, [profile, courseId]);

  const startFlashcards = async () => {
    if (!profile) return;
    setCardIndex(0);
    setFlipped(false);
    setPhase('flashcards');

    if (!userCourse) {
      const { data } = await supabase.from('user_courses').insert({
        user_id: profile.id,
        course_id: courseId,
        status: 'in_progress',
        started_at: new Date().toISOString(),
      }).select().maybeSingle();
      setUserCourse(data as UserCourse);
    } else if (userCourse.status === 'not_started') {
      await supabase.from('user_courses')
        .update({ status: 'in_progress', started_at: new Date().toISOString() })
        .eq('id', userCourse.id);
    }
  };

  const finishFlashcards = async () => {
    if (!userCourse || !profile) return;
    await supabase.from('user_courses')
      .update({ review_count: (userCourse.review_count ?? 0) + 1, last_reviewed_at: new Date().toISOString() })
      .eq('id', userCourse.id);
    setUserCourse(prev => prev ? { ...prev, review_count: (prev.review_count ?? 0) + 1 } : prev);
    setPhase('overview');
    toast({ title: 'Great work!', description: 'Flashcards reviewed. Ready to take the quiz when you feel confident.' });
  };

  const startQuiz = () => {
    const shuffled = [...questions]
      .sort(() => Math.random() - 0.5);

    setShuffledQuestions(shuffled);
    setAnswers({});
    setQuizIndex(0);
    setQuizSubmitted(false);
    setPhase('quiz');
  };

  const submitQuiz = async () => {
    if (!profile || !userCourse) return;
    let correct = 0;
    shuffledQuestions.forEach(q => {
      if (answers[q.id] === q.correct_option) correct++;
    });
    const pct = Math.round((correct / shuffledQuestions.length) * 100);
    const passed = pct >= 80;

    setScore(pct);
    setQuizSubmitted(true);

    await supabase.from('user_courses').update({
      quiz_score: pct,
      quiz_attempts: (userCourse.quiz_attempts ?? 0) + 1,
      status: passed ? 'passed' : 'failed',
      completed_at: passed ? new Date().toISOString() : null,
    }).eq('id', userCourse.id);

    setUserCourse(prev => prev ? {
      ...prev,
      quiz_score: pct,
      quiz_attempts: (prev.quiz_attempts ?? 0) + 1,
      status: passed ? 'passed' : 'failed',
      completed_at: passed ? new Date().toISOString() : null,
    } : prev);

    setPhase('results');

    // Individual carers get their certificate automatically on pass
    if (passed && isIndividual) {
      try {
        await supabase.rpc('auto_approve_individual_cert', {
          p_user_id: profile.id,
          p_course_id: courseId,
          p_completion_date: new Date().toISOString(),
        });
        setAutoCertIssued(true);
      } catch (e) {
        console.error('auto cert error', e);
      }
    }
  };

  const requestCertificate = async () => {
    if (!profile || !userCourse) return;
    // Individual carers: cert was already auto-issued on pass
    if (isIndividual) {
      router.push('/dashboard/certificates');
      return;
    }
    if (!organisation) return;
    const { error } = await supabase.from('certificate_requests').upsert({
      user_id: profile.id,
      course_id: courseId,
      organisation_id: organisation.id,
      completion_date: userCourse.completed_at ?? new Date().toISOString(),
      request_date: new Date().toISOString(),
      status: 'pending',
    });
    if (error) {
      toast({ title: 'Error', description: 'Could not submit certificate request.', variant: 'destructive' });
    } else {
      toast({ title: 'Certificate requested!', description: 'Your manager will review your request shortly.' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#005EB8]" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Course not found.</p>
        <Link href="/dashboard/courses"><Button className="mt-4">Back to Courses</Button></Link>
      </div>
    );
  }

  if (phase === 'flashcards') {
    return (
      <FlashcardPhase
        flashcards={flashcards}
        cardIndex={cardIndex}
        flipped={flipped}
        setFlipped={setFlipped}
        onNext={() => { setFlipped(false); setTimeout(() => setCardIndex(i => i + 1), 150); }}
        onPrev={() => { setFlipped(false); setTimeout(() => setCardIndex(i => i - 1), 150); }}
        onFinish={finishFlashcards}
        course={course}
      />
    );
  }

  if (phase === 'quiz') {
    return (
      <QuizPhase
        questions={shuffledQuestions}
        quizIndex={quizIndex}
        answers={answers}
        quizSubmitted={quizSubmitted}
        onAnswer={(qId, opt) => setAnswers(prev => ({ ...prev, [qId]: opt }))}
        onNext={() => setQuizIndex(i => i + 1)}
        onPrev={() => setQuizIndex(i => i - 1)}
        onSubmit={submitQuiz}
        course={course}
      />
    );
  }

  if (phase === 'results') {
    return (
      <ResultsPhase
        score={score}
        passed={score >= 80}
        course={course}
        userCourse={userCourse}
        onRetry={() => { setPhase('overview'); }}
        onRequestCert={requestCertificate}
        isIndividual={isIndividual}
        autoCertIssued={autoCertIssued}
      />
    );
  }

  // Overview phase
  const reviewCount = userCourse?.review_count ?? 0;
  const status = userCourse?.status ?? 'not_started';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="pt-8 lg:pt-0">
        <Link href="/dashboard/courses" className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#005EB8] to-[#1E6B8C] p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full mb-3 inline-block capitalize">
                  {course.category.replace(/_/g, ' ')}
                </span>
                <h1 className="text-xl font-bold mb-2">{course.title}</h1>
                <p className="text-blue-100 text-sm">{course.description}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Status & Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Flashcards', value: flashcards.length, icon: BookOpen },
                { label: 'Quiz Questions', value: questions.length, icon: Target },
                { label: 'Reviews Done', value: reviewCount, icon: RotateCcw },
                { label: 'Pass Score', value: '80%', icon: Trophy },
              ].map(stat => (
                <div key={stat.label} className="text-center p-3 bg-slate-50 rounded-xl">
                  <stat.icon className="w-5 h-5 text-[#005EB8] mx-auto mb-1.5" />
                  <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Status */}
            {status === 'passed' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-emerald-800">Course Completed!</p>
                  <p className="text-sm text-emerald-600">Score: {userCourse?.quiz_score}% · {userCourse?.quiz_attempts} attempt(s)</p>
                </div>
              </div>
            )}

            {/* Prerequisite warning */}
            {prerequisiteCourse && !prerequisitePassed && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Prerequisite Required</p>
                  <p className="text-sm text-amber-700 mt-0.5">
                    Complete <span className="font-medium">{prerequisiteCourse.title}</span> before starting this course.
                  </p>
                  <Link href={`/dashboard/courses/${prerequisiteCourse.id}`} className="inline-block mt-2">
                    <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100 h-7 text-xs">
                      Go to prerequisite course
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Spaced repetition prompt */}
            {reviewCount < 3 && status !== 'passed' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-700 font-medium mb-1">Learning Tip: Spaced Repetition</p>
                <p className="text-xs text-blue-600">
                  Review flashcards at least 3 times before taking the quiz.
                  You've reviewed {reviewCount} time(s). Progress: {Math.round((reviewCount / 3) * 100)}%
                </p>
                <div className="mt-2">
                  <Progress value={(reviewCount / 3) * 100} className="h-1.5" />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {flashcards.length > 0 && (
                <Button
                  onClick={startFlashcards}
                  disabled={prerequisiteCourse !== null && !prerequisitePassed}
                  className="flex-1 bg-[#005EB8] hover:bg-[#004a93] text-white disabled:opacity-50"
                >
                  {prerequisiteCourse && !prerequisitePassed
                    ? <><Lock className="w-4 h-4 mr-2" />Locked</>
                    : <><BookOpen className="w-4 h-4 mr-2" />{reviewCount === 0 ? 'Start Flashcards' : 'Review Flashcards'}</>
                  }
                </Button>
              )}
              {questions.length > 0 && (
                <Button
                  onClick={startQuiz}
                  disabled={prerequisiteCourse !== null && !prerequisitePassed}
                  variant={reviewCount >= 1 ? 'default' : 'outline'}
                  className={cn('flex-1 disabled:opacity-50', reviewCount >= 1 && status !== 'passed' && 'bg-emerald-600 hover:bg-emerald-700 text-white')}
                >
                  <Target className="w-4 h-4 mr-2" />
                  {status === 'passed' ? 'Retake Quiz' : 'Take Quiz'}
                </Button>
              )}
              {status === 'passed' && (
                <Button onClick={requestCertificate} variant="outline" className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50">
                  <Award className="w-4 h-4 mr-2" />
                  {isIndividual ? 'View Certificate' : 'Request Certificate'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlashcardPhase({
  flashcards, cardIndex, flipped, setFlipped,
  onNext, onPrev, onFinish, course
}: {
  flashcards: Flashcard[];
  cardIndex: number;
  flipped: boolean;
  setFlipped: (v: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  course: Course;
}) {
  const card = flashcards[cardIndex];
  const progress = ((cardIndex + 1) / flashcards.length) * 100;
  const isLast = cardIndex === flashcards.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={onFinish} className="text-slate-400 hover:text-slate-600">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <p className="text-xs text-slate-500 mb-1">{course.title}</p>
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-sm text-slate-500 font-medium">{cardIndex + 1} / {flashcards.length}</span>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <p className="text-center text-sm text-slate-500 mb-6">Click the card to reveal the answer</p>

          <div
            className="relative cursor-pointer"
            style={{ perspective: '1000px', height: '320px' }}
            onClick={() => setFlipped(!flipped)}
          >
            <div className={cn('flashcard-inner w-full h-full', flipped && 'flipped')}>
              {/* Front */}
              <div className="flashcard-front w-full h-full bg-white rounded-2xl border-2 border-[#005EB8]/20 shadow-lg flex flex-col items-center justify-center p-8">
                <div className="w-10 h-10 bg-[#005EB8]/10 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-[#005EB8]" />
                </div>
                <p className="text-lg font-semibold text-slate-900 text-center leading-relaxed">{card?.question_text}</p>
                <p className="text-xs text-slate-400 mt-6">Tap to flip</p>
              </div>
              {/* Back */}
              <div className="flashcard-back w-full h-full bg-gradient-to-br from-[#005EB8] to-[#1E6B8C] rounded-2xl shadow-lg flex flex-col items-center justify-center p-8">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg font-medium text-white text-center leading-relaxed">{card?.answer_text}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 gap-4">
            <Button
              variant="outline"
              onClick={onPrev}
              disabled={cardIndex === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            {isLast ? (
              <Button onClick={onFinish} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                <CheckCircle className="w-4 h-4 mr-1" />
                Finish Review
              </Button>
            ) : (
              <Button onClick={onNext} className="flex-1 bg-[#005EB8] hover:bg-[#004a93] text-white">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizPhase({
  questions, quizIndex, answers, quizSubmitted,
  onAnswer, onNext, onPrev, onSubmit, course
}: {
  questions: QuizQuestion[];
  quizIndex: number;
  answers: Record<string, string>;
  quizSubmitted: boolean;
  onAnswer: (qId: string, opt: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  course: Course;
}) {
  const question = questions[quizIndex];
  const progress = ((quizIndex + 1) / questions.length) * 100;
  const isLast = quizIndex === questions.length - 1;
  const allAnswered = questions.every(q => answers[q.id]);

  const options: Array<{ key: string; text: string }> = [
    { key: 'A', text: question?.option_a },
    { key: 'B', text: question?.option_b },
    { key: 'C', text: question?.option_c },
    { key: 'D', text: question?.option_d },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-slate-500 mb-1">{course.title} · Quiz</p>
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-sm text-slate-500 font-medium">{quizIndex + 1} / {questions.length}</span>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center p-6 pt-10">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
            <div className="flex items-start gap-3 mb-6">
              <span className="w-7 h-7 bg-[#005EB8] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {quizIndex + 1}
              </span>
              <p className="text-base font-semibold text-slate-900 leading-relaxed pt-0.5">
                {question?.question_text}
              </p>
            </div>

            <div className="space-y-3">
              {options.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => onAnswer(question.id, opt.key)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all text-sm",
                    answers[question.id] === opt.key
                      ? 'border-[#005EB8] bg-[#005EB8]/5 text-[#005EB8] font-medium'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <span className={cn(
                    "inline-flex w-6 h-6 rounded-full text-xs font-bold items-center justify-center mr-3",
                    answers[question.id] === opt.key ? 'bg-[#005EB8] text-white' : 'bg-slate-100 text-slate-500'
                  )}>
                    {opt.key}
                  </span>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={onPrev} disabled={quizIndex === 0} className="flex-1">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            {isLast ? (
              <Button
                onClick={onSubmit}
                disabled={!allAnswered}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={onNext} disabled={!answers[question?.id]} className="flex-1 bg-[#005EB8] text-white">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            {Object.keys(answers).length} of {questions.length} questions answered
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultsPhase({
  score, passed, course, userCourse, onRetry, onRequestCert, isIndividual, autoCertIssued
}: {
  score: number;
  passed: boolean;
  course: Course;
  userCourse: UserCourse | null;
  onRetry: () => void;
  onRequestCert: () => void;
  isIndividual?: boolean;
  autoCertIssued?: boolean;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <div className={cn(
          'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6',
          passed ? 'bg-emerald-100' : 'bg-red-100'
        )}>
          {passed
            ? <Trophy className="w-10 h-10 text-emerald-600" />
            : <XCircle className="w-10 h-10 text-red-500" />
          }
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {passed ? 'Congratulations!' : 'Keep Trying!'}
        </h1>
        <p className="text-slate-500 mb-2">
          {passed
            ? `You passed ${course.title} with a score of ${score}%`
            : `You scored ${score}%. You need 80% to pass. Review the flashcards and try again.`
          }
        </p>

        {/* Auto-cert notice for individual carers */}
        {passed && isIndividual && autoCertIssued && (
          <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3 text-left">
            <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Your certificate has been issued!</p>
              <p className="text-xs text-amber-700 mt-0.5">
                Your portfolio certificate is ready to download from My Certificates — no approval needed.
              </p>
            </div>
          </div>
        )}

        <div className={cn(
          'text-5xl font-bold mb-2',
          passed ? 'text-emerald-600' : 'text-red-500'
        )}>
          {score}%
        </div>
        <p className="text-sm text-slate-400 mb-8">
          {passed ? 'Pass' : 'Below required 80%'}
        </p>

        <div className="flex flex-col gap-3">
          {passed && (
            <Button
              onClick={onRequestCert}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Award className="w-4 h-4 mr-2" />
              {isIndividual ? 'View My Certificate' : 'Request Certificate'}
            </Button>
          )}
          <Button
            onClick={onRetry}
            variant={passed ? 'outline' : 'default'}
            className={cn('w-full', !passed && 'bg-[#005EB8] text-white')}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {passed ? 'Back to Course' : 'Review & Try Again'}
          </Button>
          <Link href="/dashboard/courses" className="w-full">
            <Button variant="ghost" className="w-full">Return to All Courses</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
