import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { authenticatorFirestore as db } from "src/config";

export const rentApi = createApi({
  reducerPath: "rentApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["rent"],
  endpoints: (builder) => ({
    getRentById: builder.query({
      async queryFn(rentId) {
        try {
          const docRef = doc(db, "rents", rentId);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            return { error: { message: "Rent data not found." } };
          }
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
      providesTags: ["rent"],
    }),
    // get rental information by property id
    getRentsByPropertyId: builder.query({
      async queryFn(propertyId) {
        try {
          const q = query(
            collection(db, "rents"),
            where("propertyId", "==", propertyId),
          );

          const querySnapshot = await getDocs(q);
          const rents = [];
          querySnapshot.forEach((doc) => {
            rents.push({ id: doc.id, ...doc.data() });
          });

          return { data: rents };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      providesTags: ["rent"],
    }),
    // get rental information by property id
    getRentByMonth: builder.query({
      async queryFn({ propertyId, rentMonth }) {
        try {
          const q = query(
            collection(db, "rents"),
            where("propertyId", "==", propertyId),
            where("rentMonth", "==", rentMonth),
          );

          const querySnapshot = await getDocs(q);
          const rents = [];
          querySnapshot.forEach((doc) => {
            rents.push({ id: doc.id, ...doc.data() });
          });

          return { data: rents };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      providesTags: ["rent"],
    }),
    // creates rental record for a property once payment is confirmed
    createRentRecord: builder.mutation({
      async queryFn(rentData) {
        try {
          const { id, tenantId, propertyId, rentMonth, ...rest } = rentData;

          if (!id || !tenantId || !propertyId || !rentMonth) {
            return {
              error: {
                message: "Missing required fields.",
              },
            };
          }

          // Check for duplicate rent record
          const rentQuery = query(
            collection(db, "rents"),
            where("tenantId", "==", tenantId),
            where("propertyId", "==", propertyId),
            where("rentMonth", "==", rentMonth),
          );

          const existing = await getDocs(rentQuery);
          if (!existing.empty) {
            return {
              error: {
                message:
                  "Duplicate entry found. Rent data already exists for current user for selected property.",
              },
            };
          }

          const docRef = doc(db, "rents", id);
          await setDoc(
            docRef,
            { tenantId, propertyId, rentMonth, ...rest },
            { merge: true },
          );

          return { data: { id, tenantId, propertyId, rentMonth, ...rest } };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      invalidatesTags: ["rent"],
    }),
  }),
});
export const {
  useGetRentByIdQuery,
  useGetRentsByPropertyIdQuery,
  useLazyGetRentByMonthQuery,
  useCreateRentRecordMutation,
} = rentApi;
