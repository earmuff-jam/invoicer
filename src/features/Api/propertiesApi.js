import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { authenticatorFirestore as db } from "src/config";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const propertiesApi = createApi({
  reducerPath: "propertiesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["properties"],
  endpoints: (builder) => ({
    getPropertiesByPropertyId: builder.query({
      async queryFn(propertyId) {
        try {
          const docRef = doc(db, "properties", propertyId);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists())
            return { error: { message: "properties not found" } };
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
      providesTags: ["properties"],
    }),

    getPropertiesByUserId: builder.query({
      async queryFn(userId) {
        try {
          const q = query(
            collection(db, "properties"),
            where("createdBy", "==", userId)
          );
          const querySnapshot = await getDocs(q);
          const properties = [];
          querySnapshot.forEach((doc) => {
            properties.push({ id: doc.id, ...doc.data() });
          });
          return { data: properties };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      providesTags: ["properties"],
    }),

    createProperty: builder.mutation({
      async queryFn(property) {
        try {
          const userRef = doc(db, "properties", property.id);
          await setDoc(userRef, property, { merge: true });
          return { data: property };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      invalidatesTags: ["properties"],
    }),

    updatePropertyById: builder.mutation({
      async queryFn(data) {
        try {
          const propertyRef = doc(db, "properties", data?.id);
          await setDoc(propertyRef, data, { merge: true });
          return { data };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      invalidatesTags: ["properties"],
    }),

    deletePropertyById: builder.mutation({
      async queryFn(uid) {
        try {
          const propertyRef = doc(db, "properties", uid);
          await deleteDoc(propertyRef);
          return { data: { uid } };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      invalidatesTags: ["properties"],
    }),
  }),
});

export const {
  useGetPropertiesByPropertyIdQuery,
  useGetPropertiesByUserIdQuery,
  useCreatePropertyMutation,
  useUpdatePropertyByIdMutation,
  useDeletePropertyByIdMutation,
} = propertiesApi;
