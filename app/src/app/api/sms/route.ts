import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { contacts, message } = await req.json();

        if (!contacts || contacts.length === 0) {
            return NextResponse.json({ error: 'Inga mottagare angivna.' }, { status: 400 });
        }

        if (!message) {
            return NextResponse.json({ error: 'Inget meddelande angivet.' }, { status: 400 });
        }

        // Läs in API-nycklar från miljökvariabler
        const apiUsername = process.env.ELKS_API_USERNAME;
        const apiPassword = process.env.ELKS_API_PASSWORD;

        if (!apiUsername || !apiPassword) {
            // Mock-läget för lokal utveckling innan kontot är skapat
            console.log('MOCK SMS - Inga API-nycklar funna. Skulle ha skickat följande:');
            console.log(`Mottagare: ${contacts.map((c: { phone: string }) => c.phone).join(', ')}`);
            console.log(`Meddelande: ${message}`);

            // Simulera nätverksfördröjning
            await new Promise(resolve => setTimeout(resolve, 1500));

            return NextResponse.json({
                success: true,
                message: 'Mock SMS skickades framgångsrikt.',
                mocked: true,
                sentCount: contacts.length
            });
        }

        // Verkligt API-anrop till 46elks
        const authHeaders = new Headers();
        const base64Auth = Buffer.from(`${apiUsername}:${apiPassword}`).toString('base64');
        authHeaders.append('Authorization', `Basic ${base64Auth}`);
        authHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const results = [];
        const errors = [];

        // Skicka SMS till varje kontakt
        for (const contact of contacts) {
            const body = new URLSearchParams();
            // "Antigravity" som textbaserad avsändare
            body.append('from', 'Antigravity');
            body.append('to', contact.phone);
            body.append('message', message);

            try {
                const response = await fetch('https://api.46elks.com/a1/sms', {
                    method: 'POST',
                    headers: authHeaders,
                    body: body
                });

                if (response.ok) {
                    const data = await response.json();
                    results.push(data);
                } else {
                    console.error(`Misslyckades att skicka till ${contact.phone}: ${response.statusText}`);
                    errors.push(contact.phone);
                }
            } catch (err) {
                console.error(`Nätverksfel vid sändning till ${contact.phone}:`, err);
                errors.push(contact.phone);
            }
        }

        if (errors.length > 0) {
            return NextResponse.json({
                success: false,
                message: `Kunde inte skicka till ${errors.length} mottagare.`,
                errors
            }, { status: 207 });
        }

        return NextResponse.json({
            success: true,
            message: 'Alla SMS skickades framgångsrikt.',
            sentCount: results.length
        });

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: 'Ett internt serverfel uppstod.' }, { status: 500 });
    }
}
