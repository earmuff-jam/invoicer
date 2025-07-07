import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { authenticatorFirestore as db } from "src/config";
import { TenantRole } from "src/features/Landing/constants";

export const firebaseUserApi = createApi({
  reducerPath: "firebaseUserApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    // fetch users from users db
    getUserList: builder.query({
      async queryFn() {
        try {
          const usersRef = collection(db, "users");
          const snapshot = await getDocs(usersRef);
          const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          return { data: users };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      transformResponse: (users) => {
        return users.filter((user) => user.role === TenantRole);
      },
    }),
    // fetch user data where user id matches the passed in user id from users db
    getUserDataById: builder.query({
      async queryFn(uid) {
        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists())
            return { error: { message: "User not found" } };
          return { data: docSnap.data() };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      providesTags: ["User"],
    }),
    // create user in users db
    createUser: builder.mutation({
      async queryFn(user) {
        try {
          const userRef = doc(db, "users", user.uid);

          await setDoc(userRef, user, { merge: true }); // always upsert

          return { data: user };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    // update user in users db
    updateUserByUid: builder.mutation({
      async queryFn({ uid, newData }) {
        try {
          const userRef = doc(db, "users", uid);
          await setDoc(userRef, newData, { merge: true });
          return { data: newData };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useGetUserDataByIdQuery,
  useCreateUserMutation,
  useUpdateUserByUidMutation,
  useLazyGetUserDataByIdQuery,
} = firebaseUserApi;
