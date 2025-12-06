import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface OtpEmailProps {
  token: string
  email_action_type: string
}

export const OtpEmail = ({ token, email_action_type }: OtpEmailProps) => {
  const actionText = email_action_type === 'signup' ? 'signup' : 'login'
  
  return (
    <Html>
      <Head />
      <Preview>Your Kisanseva Plus {actionText} OTP</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={logo}>🌾 Kisanseva Plus</Heading>
          </Section>
          
          <Heading style={h1}>Your Kisanseva Plus {actionText} OTP</Heading>
          
          <Text style={text}>
            Use the following OTP code to complete your {actionText}:
          </Text>
          
          <Section style={otpContainer}>
            <Text style={otpCode}>{token}</Text>
          </Section>
          
          <Text style={text}>
            This OTP is valid for 1 hour. Do not share this code with anyone.
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            You are receiving this email because you signed up for an application powered by Kisanseva Plus.
          </Text>
          
          <Text style={footerSmall}>
            If you didn't request this, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default OtpEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  borderRadius: '8px',
  maxWidth: '480px',
}

const logoSection = {
  textAlign: 'center' as const,
  marginBottom: '20px',
}

const logo = {
  color: '#2d5a27',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0 20px',
}

const text = {
  color: '#4a4a4a',
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'center' as const,
}

const otpContainer = {
  backgroundColor: '#f0f7ed',
  borderRadius: '8px',
  padding: '20px',
  margin: '30px 0',
  textAlign: 'center' as const,
}

const otpCode = {
  color: '#2d5a27',
  fontSize: '36px',
  fontWeight: 'bold',
  letterSpacing: '8px',
  margin: '0',
}

const hr = {
  borderColor: '#e6e6e6',
  margin: '30px 0',
}

const footer = {
  color: '#666666',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '0 0 10px',
}

const footerSmall = {
  color: '#999999',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0',
}
