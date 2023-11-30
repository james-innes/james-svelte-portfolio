import type { Guest } from "$lib/types";
import { formatDate } from "$lib/utils";
import { RESEND } from "$env/static/private";
import { Resend } from "resend";

const resend = new Resend(RESEND);

export default async function sendWelcomeEmail(tourDate: string, guest: Guest) {
  const emailResponse = await resend.emails.send({
    from: "contact@travel-company.ltd",
    to: guest.email,
    subject: "🎟️ 🛵 ⛰️ Travel Company Ha Giang Loops Tickets",
    text: `
Hi ${guest.guestName} 👋

📅 Which day to meet: ${formatDate(tourDate, "English")}

⏰ What time: 3pm

📍 Where: travel-company Ha Giang Pickup
🔗 https://goo.gl/maps/fnFBw8ZadkmhjtxU7

🚶‍♂️ How to get there: Walk or order a Grab ride 🛵

📋 Pickup and checkin:
🔗 https://www.travel-company.ltd/ha-giang-pickup

🎒 What to pack:
🔗 https://www.travel-company.ltd/ha-giang-packing

📱 You will be added to a WhatsApp group.

We're excited to see you soon! 🤩
    `,
  });
}
