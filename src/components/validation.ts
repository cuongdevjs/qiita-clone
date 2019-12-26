interface MinLengthPayload {
  min: number
  max: number
}

interface MinLength extends MinLengthPayload {
  name: 'min-length'
}

interface Format {
  name: 'format'
  regexp: RegExp
}

interface ValidationStatus {
  valid: boolean
  message?: string
}

const format = (regexp: RegExp): Format => ({
  name: 'format',
  regexp
})

const minLength = ({ min, max }: MinLengthPayload): MinLength => ({
  name: 'min-length',
  min,
  max,
})

export type Rule = MinLength | Format

const validate = (value: string, rules: Rule[], validMessage?: string): ValidationStatus => {
  for (const rule of rules) {
    if (rule.name === 'min-length' && (value.length < rule.min || value.length > rule.max)) {
      return {
        valid: false,
        message: `Value must be between ${rule.min} and ${rule.max}`,
      }
    }

    if (rule.name === 'format' && !value.match(rule.regexp)) {
      return {
        valid: false,
        message: 'Value does not match required format',
      }
    }
  }

  return { 
    valid: true,
    message: validMessage
  }
}

export {
  format,
  minLength,
  validate,
}
