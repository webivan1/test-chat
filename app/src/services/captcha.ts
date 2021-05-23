import { load } from 'recaptcha-v3'

export const captchaToken = async (action: string) => {
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve('captchaTestCode')
  }

  const captcha = await load(String(process.env.REACT_APP_CAPTCHA_TOKEN || ''))

  return await captcha.execute(action)
}
