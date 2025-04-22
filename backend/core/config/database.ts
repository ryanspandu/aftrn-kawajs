export const getDatabaseUrl = () => {
  const {
    DATABASE_DRIVER,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT
  } = process.env

  return `${DATABASE_DRIVER}://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/kawajs`
}