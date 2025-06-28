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

export const tenantsApi = createApi({
  reducerPath: "tenantsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["tenants"],
  endpoints: (builder) => ({
    getTenantById: builder.query({
      async queryFn(tenantId) {
        try {
          const docRef = doc(db, "tenants", tenantId);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            return { error: { message: "Tenant not found" } };
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
      providesTags: ["tenants"],
    }),

    getTenantsByUserId: builder.query({
      async queryFn(userId) {
        try {
          const q = query(
            collection(db, "tenants"),
            where("createdBy", "==", userId)
          );
          const querySnapshot = await getDocs(q);
          const tenants = [];
          querySnapshot.forEach((doc) => {
            tenants.push({ id: doc.id, ...doc.data() });
          });
          return { data: tenants };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      providesTags: ["tenants"],
    }),

    getTenantByPropertyId: builder.query({
      async queryFn(propertyId) {
        try {
          const q = query(
            collection(db, "tenants"),
            where("propertyId", "==", propertyId)
          );
          const querySnapshot = await getDocs(q);
          const tenants = [];
          querySnapshot.forEach((doc) => {
            tenants.push({ id: doc.id, ...doc.data() });
          });
          return { data: tenants || [] };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      providesTags: ["tenants"],
    }),

    createTenant: builder.mutation({
      async queryFn(tenant) {
        try {
          const tenantRef = doc(db, "tenants", tenant.id);
          await setDoc(tenantRef, tenant, { merge: true });
          return { data: tenant };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      invalidatesTags: ["tenants"],
    }),

    updateTenantById: builder.mutation({
      async queryFn({ id, newData }) {
        try {
          const tenantRef = doc(db, "tenants", id);
          await setDoc(tenantRef, newData, { merge: true });
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
      invalidatesTags: ["tenants"],
    }),

    deleteTenantById: builder.mutation({
      async queryFn(id) {
        try {
          const tenantRef = doc(db, "tenants", id);
          await deleteDoc(tenantRef);
          return { data: { id } };
        } catch (error) {
          return {
            error: {
              message: error.message,
              code: error.code,
            },
          };
        }
      },
      invalidatesTags: ["tenants"],
    }),
  }),
});

export const {
  useGetTenantByIdQuery,
  useGetTenantsByUserIdQuery,
  useGetTenantByPropertyIdQuery,
  useCreateTenantMutation,
  useUpdateTenantByIdMutation,
  useDeleteTenantByIdMutation,
} = tenantsApi;
