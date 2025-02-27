/* import emailjs from 'emailjs-com';

const sendEmail = async (toEmail: string, reporteTitulo: string) => {
    const templateParams = {
        to_email: toEmail,
        subject: 'Nuevo Reporte en el Sistema',
        message: `Tienes un nuevo reporte en el sistema: ${reporteTitulo}`,
    };

    try {
        await emailjs.send(
            'YOUR_SERVICE_ID', 
            'YOUR_TEMPLATE_ID', 
            templateParams,
            'YOUR_USER_ID' 
        );
        console.log('Correo enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}; */