import sgMail from '@sendgrid/mail'

// Initialize SendGrid with API key
sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY)

// Mock email service for development
export const emailService = {
  async sendStatusChangeNotification(vehicleData: any) {
    if (!vehicleData.driverEmail) {
      console.warn(`Warning: Cannot send email notification - no email address found for vehicle ${vehicleData.caseNumber}`)
      return false
    }

    try {
      const msg = {
        to: vehicleData.driverEmail,
        from: import.meta.env.VITE_SENDGRID_FROM_EMAIL, // Your verified sender email
        subject: 'Vehicle Status Update - Ready for Processing',
        text: getPlainTextContent(vehicleData),
        html: getHtmlContent(vehicleData)
      }

      await sgMail.send(msg)
      console.log('Email notification sent successfully')
      return true
    } catch (error: unknown) {
      console.error('Error sending email:', error)
      throw new Error(`Failed to send email notification: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}

const getPlainTextContent = (vehicleData: any) => {
  return `
Dear ${vehicleData.driverName || 'Vehicle Owner'},
We hope this email finds you well. We are writing to inform you that your vehicle impounded at our facility has been cleared for processing.

Vehicle Details:
- Make & Model: ${vehicleData.make} ${vehicleData.model}
- License Plate: ${vehicleData.plate}
- Case Number: ${vehicleData.caseNumber}

About IVRS (Impounded Vehicle Release System):
Our system is designed to streamline the vehicle release process and keep you informed at every step. IVRS helps manage and track impounded vehicles efficiently while ensuring transparent communication with vehicle owners.

Next Steps:
1. You can now begin the release process for your vehicle
2. Please prepare the necessary documentation
3. Visit our facility during business hours
4. Complete the payment and processing requirements

If you have any questions or need assistance, please don't hesitate to contact us.

Best regards,
IVRS Team
`
}

const getHtmlContent = (vehicleData: any) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Vehicle Status Update</h2>
      <p>Dear ${vehicleData.driverName || 'Vehicle Owner'},</p>
      <p>We hope this email finds you well. We are writing to inform you that your vehicle impounded at our facility has been cleared for processing.</p>
      
      <h3>Vehicle Details:</h3>
      <ul>
        <li><strong>Make & Model:</strong> ${vehicleData.make} ${vehicleData.model}</li>
        <li><strong>License Plate:</strong> ${vehicleData.plate}</li>
        <li><strong>Case Number:</strong> ${vehicleData.caseNumber}</li>
      </ul>

      <h3>About IVRS:</h3>
      <p>Our system is designed to streamline the vehicle release process and keep you informed at every step. IVRS helps manage and track impounded vehicles efficiently while ensuring transparent communication with vehicle owners.</p>

      <h3>Next Steps:</h3>
      <ol>
        <li>You can now begin the release process for your vehicle</li>
        <li>Please prepare the necessary documentation</li>
        <li>Visit our facility during business hours</li>
        <li>Complete the payment and processing requirements</li>
      </ol>

      <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>

      <p>Best regards,<br>IVRS Team</p>
    </div>
  `
}