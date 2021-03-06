import React, { FunctionComponent, CSSProperties } from 'react'
import Mustache from 'mustache'
import { Config }from 'dompurify'
import dompurify from 'dompurify'

export type ComponentType = 'div' | 'span';

export interface TemplateComponentProps {
  template: string
  sanitize?: boolean
  sanitizeOptions?: Config
  data?: object
  className?: string
  style?: CSSProperties
  type?: ComponentType
  onClick?: () => void
  onDblClick?: () => void
}

const TemplateComponent: FunctionComponent<TemplateComponentProps> = ({
  template,
  sanitize,
  sanitizeOptions,
  data,
  className,
  style,
  type,
  onClick,
  onDblClick
}) => {
  try {
    const compiled = typeof template === 'string' ? Mustache.render(template, data) : null;
    const shouldSanitize = typeof sanitize === 'boolean' ? sanitize : 'true';

    if (compiled === null) {
      return null;
    }

    const sanitizer = dompurify().sanitize;
    const __html = (shouldSanitize ? (typeof sanitizeOptions !== 'undefined' ? sanitizer(compiled, sanitizeOptions) : sanitizer(compiled)) : compiled) as string;

    if (type && type === 'span') {
      return (
        <span
          style={style}
          className={className}
          dangerouslySetInnerHTML={{ __html }}
          onClick={onClick}
          onDoubleClick={onDblClick}
        />
      )
    }

    return (
      <div
          style={style}
          className={className}
          dangerouslySetInnerHTML={{ __html }}
          onClick={onClick}
          onDoubleClick={onDblClick}
      />
    );

  } catch (error) {
    console.error(error);
    return null;
  }
}

export default TemplateComponent
