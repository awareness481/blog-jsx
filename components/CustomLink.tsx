import Link from 'next/link'
import React from 'react'
import { UrlObject } from 'url';

type Url = string | UrlObject;

export default function CustomLink({ as, href, ...otherProps }: {
  as: Url,
  href: 'string'
}) {
  return (
    <>
      <Link as={as} href={href}>
        <a {...otherProps} />
      </Link>
      <style jsx>{`
        a {
          color: #da2505;
        }
      `}</style>
    </>
  )
}
