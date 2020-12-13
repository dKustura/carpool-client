import React from 'react';

// Components
import { Grid } from '@material-ui/core';
import TravelPlanCard from 'components/TravelPlanCard';

// Helpers
import { TravelPlan } from 'api';

interface Props {
  readonly travelPlans: TravelPlan[];
  readonly getEditHandler: (travelPlanId: number) => () => void;
  readonly getDeleteHandler: (travelPlanId: number) => () => Promise<void>;
}

const TravelPlanList = ({
  travelPlans,
  getEditHandler,
  getDeleteHandler,
}: Props) => {
  return (
    <Grid container justify="center" spacing={3}>
      {travelPlans.map((travelPlan) => (
        <Grid item key={travelPlan.travelPlanId} xs={12} sm={10} md={6}>
          <TravelPlanCard
            travelPlan={travelPlan}
            onEdit={getEditHandler(travelPlan.travelPlanId)}
            onDelete={getDeleteHandler(travelPlan.travelPlanId)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TravelPlanList;
