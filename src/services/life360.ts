import 'dotenv/config';
import { Agent } from 'undici'; // Nativo do Node.js, não requer instalação

// Força uma assinatura TLS diferente da padrão do Node.js
const tlsDispatcher = new Agent({
  connect: {
    ciphers: 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256',
    minVersion: 'TLSv1.3',
    maxVersion: 'TLSv1.3'
  }
});

export async function fetchCircles() {
  const url = "https://api-cloudfront.life360.com/v3/circles.json";
  const token = process.env.LIFE360_TOKEN;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
      "User-Agent": "com.life360.android.safetymapi/24.5.0"
    },
    // Injeta o agente modificado para burlar o fingerprint do Cloudflare
    // @ts-ignore - Necessário se a tipagem global do fetch ainda não mapear o dispatcher
    dispatcher: tlsDispatcher
  });
  
  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Corpo do erro retornado pela API:", errorBody.substring(0, 200));
    throw new Error(`Falha na Api Life360: ${response.status}`);
  }
  
  return response.json();
}