import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const supabaseAdmin =
      createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get(
          "SUPABASE_SERVICE_ROLE_KEY"
        )!
      );

    const authHeader =
      req.headers.get("Authorization");

    if (!authHeader) {
      throw new Error("Unauthorized");
    }

    const token =
      authHeader.replace(
        "Bearer ",
        ""
      );

    const {
      data: { user },
      error: authError,
    } =
      await supabaseAdmin.auth.getUser(
        token
      );

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const {
      data: currentUserProfile,
      error: profileError,
    } =
      await supabaseAdmin
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (
      profileError ||
      !currentUserProfile
    ) {
      throw new Error(
        "Profile not found"
      );
    }

    if (
      currentUserProfile.role !==
      "super_admin"
    ) {
      throw new Error(
        "Only Super Admin can delete organisations"
      );
    }

    const {
      organisationId,
    } = await req.json();

    if (!organisationId) {
      throw new Error(
        "Organisation ID is required"
      );
    }

    const {
      data: organisation,
      error: organisationError,
    } =
      await supabaseAdmin
        .from("organisations")
        .select("id,name")
        .eq(
          "id",
          organisationId
        )
        .single();

    if (
      organisationError ||
      !organisation
    ) {
      throw new Error(
        "Organisation not found"
      );
    }

    const {
      data: organisationUsers,
      error: usersError,
    } =
      await supabaseAdmin
        .from("profiles")
        .select("id,email,role")
        .eq(
          "organisation_id",
          organisationId
        );

    if (usersError) {
      throw usersError;
    }

    const userIds =
      organisationUsers?.map(
        user => user.id
      ) || [];

    console.log(
      "Deleting organisation:",
      organisation.name
    );

    console.log(
      "Users found:",
      userIds.length
    );

    // =====================================
    // USER RELATED DATA
    // =====================================

    if (userIds.length > 0) {

      await supabaseAdmin
        .from("user_courses")
        .delete()
        .in(
          "user_id",
          userIds
        );

      await supabaseAdmin
        .from(
          "user_bundle_assignments"
        )
        .delete()
        .in(
          "user_id",
          userIds
        );

      await supabaseAdmin
        .from(
          "individual_subscriptions"
        )
        .delete()
        .in(
          "user_id",
          userIds
        );
    }

    // =====================================
    // ORGANISATION RELATED DATA
    // =====================================

    await supabaseAdmin
      .from(
        "certificate_requests"
      )
      .delete()
      .eq(
        "organisation_id",
        organisationId
      );

    await supabaseAdmin
      .from(
        "course_assignments"
      )
      .delete()
      .eq(
        "organisation_id",
        organisationId
      );

    await supabaseAdmin
      .from(
        "org_course_library"
      )
      .delete()
      .eq(
        "organisation_id",
        organisationId
      );

    await supabaseAdmin
      .from("notifications")
      .delete()
      .eq(
        "organisation_id",
        organisationId
      );

    await supabaseAdmin
      .from("courses")
      .delete()
      .eq(
        "organisation_id",
        organisationId
      );

    // =====================================
    // AUDIT ENTRY
    // =====================================

    await supabaseAdmin
      .from("audit_logs")
      .insert({
        organisation_id:
          organisationId,

        performed_by:
          user.id,

        action:
          "organisation_deleted",

        resource_type:
          "organisation",

        resource_id:
          organisationId,

        details: {
          organisation_name:
            organisation.name,

          users_deleted:
            userIds.length,
        },
      });

    // =====================================
    // DELETE PROFILES
    // =====================================

    await supabaseAdmin
      .from("profiles")
      .delete()
      .eq(
        "organisation_id",
        organisationId
      );

    // =====================================
    // DELETE AUTH USERS
    // =====================================

    for (const userId of userIds) {
      try {
        await supabaseAdmin
          .auth
          .admin
          .deleteUser(userId);

      } catch (error) {

        console.error(
          "Failed to delete auth user:",
          userId,
          error
        );
      }
    }

    // =====================================
    // DELETE ORGANISATION
    // =====================================

    const {
      error: deleteOrganisationError,
    } =
      await supabaseAdmin
        .from("organisations")
        .delete()
        .eq(
          "id",
          organisationId
        );

    if (
      deleteOrganisationError
    ) {
      throw deleteOrganisationError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Organisation deleted successfully",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );

  } catch (error) {

    console.error(error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : String(error),
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  }
});