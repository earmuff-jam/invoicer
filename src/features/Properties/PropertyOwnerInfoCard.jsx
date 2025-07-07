import {
  Avatar,
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  BusinessRounded,
  InfoRounded,
  LocationOnRounded,
  PhoneRounded,
} from "@mui/icons-material";

import RowHeader from "common/RowHeader/RowHeader";
import { useGetUserDataByIdQuery } from "features/Api/firebaseUserApi";
import AButton from "common/AButton";
import { useGenerateStripeCheckoutSession } from "hooks/useGenerateStripeCheckoutSession";
import { fetchLoggedInUser } from "features/Properties/utils";
import dayjs from "dayjs";
import { useLazyGetRentByMonthQuery } from "features/Api/rentApi";
import { useEffect } from "react";

export default function PropertyOwnerInfoCard({
  isViewingRental = false,
  isPropertyLoading = false,
  property,
}) {
  const user = fetchLoggedInUser();
  const { data: owner = {}, isLoading } = useGetUserDataByIdQuery(
    property?.createdBy,
    {
      skip: !property?.createdBy,
    }
  );

  const [triggerGetRentByMonth, { data: rentMonthData = [], isFetching }] =
    useLazyGetRentByMonthQuery();

  const { generateStripeCheckoutSession } = useGenerateStripeCheckoutSession();

  // need to check if a property owner without stripe can pay or not
  // console.log(owner, owner?.stripeAccountIsActive);
  const isStripeConnectedAndValid =
    isViewingRental && owner?.stripeAccountIsActive;

  const paymentCompleteForCurrentMonth =
    rentMonthData?.find((item) => item)?.status === "paid";

  const handleRentPayment = async ({
    stripeOwnerAccountId,
    stripeAccountIsActive,
    totalAmountInDollars,
    propertyId,
    propertyOwnerId,
    tenantId,
    rentMonth,
    tenantEmail,
  }) => {
    if (!stripeAccountIsActive) {
      return;
    }

    const secureURL = await generateStripeCheckoutSession({
      stripeOwnerAccountId, // the person who the payment must go towards
      amount: totalAmountInDollars,
      tenantEmail: tenantEmail,
      propertyId: propertyId,
      propertyOwnerId: propertyOwnerId,
      tenantId: tenantId,
      rentMonth: rentMonth,
    });

    window.open(secureURL, "_blank", "noopener,noreferrer");
    return;
  };

  useEffect(() => {
    if (property?.id) {
      const currentMonth = dayjs().format("MMMM");
      console.log(property?.id, currentMonth);
      triggerGetRentByMonth({
        propertyId: property?.id,
        rentMonth: currentMonth,
      });
    }
  }, [property?.id]);

  if (isLoading) return <Skeleton height="10rem" />;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <RowHeader
          title="Property Owner"
          sxProps={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
            gap: 1,
            textAlign: "left",
            variant: "subtitle2",
            fontWeight: "bold",
          }}
          caption={<BusinessRounded color="primary" />}
        />
        {isPropertyLoading ? (
          <Skeleton height="10rem" />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <Avatar
                src={owner?.googlePhotoURL}
                sx={{ width: 56, height: 56 }}
              >
                {owner?.first_name?.charAt(0)}
                {owner?.last_name?.charAt(0)}
              </Avatar>
              <Box>
                <RowHeader
                  title={
                    owner?.googleDisplayName ||
                    `${owner?.first_name || ""} ${owner?.last_name || ""}`
                  }
                  caption={owner?.email}
                  sxProps={{
                    textAlign: "left",
                  }}
                />
              </Box>
            </Box>

            {isViewingRental ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <AButton
                  size="small"
                  variant="contained"
                  label="Pay rent"
                  sx={{ margin: "0.4rem 0rem" }}
                  disabled={
                    !isStripeConnectedAndValid || paymentCompleteForCurrentMonth
                  }
                  onClick={() =>
                    handleRentPayment({
                      stripeOwnerAccountId: owner?.stripeAccountId,
                      stripeAccountIsActive: owner?.stripeAccountIsActive,
                      propertyId: property?.id,
                      propertyOwnerId: property?.createdBy, // the owner of the property
                      tenantId: user?.uid, // the current payee which is also a tenant
                      rentMonth: dayjs().format("MMMM"),
                      tenantEmail: user?.googleEmailAddress, // the current renter
                      totalAmountInDollars:
                        Number(property?.rent) +
                        Number(property?.additional_rent),
                    })
                  }
                />
                <Tooltip title="Rent can be paid only if the owner has stripe setup and if current month is due.">
                  <InfoRounded color="secondary" fontSize="small" />
                </Tooltip>
              </Stack>
            ) : null}

            <Stack spacing={1}>
              {owner?.phone && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneRounded fontSize="small" color="action" />
                  <Typography variant="body2">{owner?.phone}</Typography>
                </Box>
              )}
              {owner?.city && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnRounded fontSize="small" color="action" />
                  <Typography variant="body2">
                    {owner?.city}, {owner?.state} {owner?.zipcode}
                  </Typography>
                </Box>
              )}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
}
