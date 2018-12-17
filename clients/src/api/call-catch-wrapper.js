export default async func => {
  try {
    const result = await func()
    return { success: true, result }
  }
  catch (e) {
    return { success: false, message: typeof e === 'string' ? e : e.message }
  }
}

