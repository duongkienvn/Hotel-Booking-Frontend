export const verify = (status) => {
  return {
    type: "VERIFY",
    isVerified: status
  }
}