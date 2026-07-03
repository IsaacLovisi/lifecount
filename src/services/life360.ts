//Services - Life360

import 'dotenv/config';
import { fetch, Agent } from 'undici';
import type { CircleDTO, Life360CirclesResponse } from '../models/circles.ts';

const tlsDispatcher = new Agent({
  connect: {
    ciphers: 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256',
    minVersion: 'TLSv1.3',
    maxVersion: 'TLSv1.3'
  }
});

export async function fetchCircles(): Promise<CircleDTO[]> {
  const url = "https://api-cloudfront.life360.com/v3/circles.json";
  const token = process.env.LIFE360_TOKEN;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "*/*",
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:150.0) Gecko/20100101 Firefox/150.0",
      "Origin": "https://www.life360.com",
      "Referer": "https://www.life360.com/",
      "Accept-Language": "en-US,en;q=0.9"
    },
    dispatcher: tlsDispatcher
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Corpo do erro retornado pela API:", errorBody.substring(0, 200));
    throw new Error(`Falha na Api Life360: ${response.status}`);
  }

  const rawData = (await response.json()) as Life360CirclesResponse;

  return rawData.circles.map(circle => ({
    id: circle.id,
    name: circle.name,
    color: `#${circle.color}`,
    memberCount: circle.memberCount,
    createdAt: circle.createdAt
  }));
}