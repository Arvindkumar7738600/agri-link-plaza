import React from 'npm:react@18.3.1'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { OtpEmail } from './_templates/otp-email.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    console.log('Received payload:', JSON.stringify(payload))

    const { user, email_data } = payload
    const { token, email_action_type } = email_data

    console.log('Sending OTP email to:', user.email, 'Type:', email_action_type)

    const html = await renderAsync(
      React.createElement(OtpEmail, {
        token,
        email_action_type,
      })
    )

    const actionText = email_action_type === 'signup' ? 'Signup' : 'Login'

    const { error } = await resend.emails.send({
      from: 'Kisanseva Plus <onboarding@resend.dev>',
      to: [user.email],
      subject: `Kisanseva Plus - Your ${actionText} OTP`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Email sent successfully to:', user.email)

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error: any) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({
        error: {
          http_code: error.code || 500,
          message: error.message || 'Failed to send email',
        },
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  }
})
