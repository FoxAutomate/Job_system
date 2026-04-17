import { execSync } from "node:child_process";
import type { NextConfig } from "next";

function shortCommitRef(): string {
  const full =
    process.env.VERCEL_GIT_COMMIT_SHA?.trim() ||
    process.env.CF_PAGES_COMMIT_SHA?.trim();
  if (full) {
    return full.length > 7 ? full.slice(0, 7) : full;
  }
  try {
    return execSync("git rev-parse --short HEAD", {
      encoding: "utf8",
    }).trim();
  } catch {
    return "—";
  }
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_COMMIT_REF: shortCommitRef(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
