import type { MetadataRoute } from "next";
import { ALLOW_SEARCH_INDEXING } from "@/lib/site";

// /robots.txt 를 만들어 주는 파일. 켜고 끄는 건 lib/site.ts 에서 합니다.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: ALLOW_SEARCH_INDEXING
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
  };
}
