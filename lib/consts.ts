/* Environment Constants */

export const ARTIFACT_API_URL = process.env.NEXT_PUBLIC_ARTIFACT_API_URL || "";
export const ABSTRACT_API_URL = process.env.NEXT_PUBLIC_ABSTRACT_API_URL || "";
export const ABSTRACT_API_KEY = process.env.NEXT_PUBLIC_ABSTRACT_API_KEY;

/* User Details Stub */

export const userDetailsStub = {
  success: true,
  profile: {
    user_uuid: "aa2a7a42-82a7-4350-b23f-57c74445964d",
    display_name: "jaytest",
    username: "jaytest",
    email: "npm@gmail.com",
    location: "",
    avatar_uri:
      "https://firebasestorage.googleapis.com/v0/b/adtest-96abe.appspot.com/o/images%2Fjaytest%2F4475da4a-7526-4c34-88fb-05712576b738.png?alt=media&token=a29930c9-d8a7-448d-a952-4791b282a368",
    created_at: "2024-01-18T01:08:19+0000",
  },
};
