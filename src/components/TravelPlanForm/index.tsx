import { Field, FieldProps, Form, Formik } from 'formik';
import React, { useState } from 'react';

// Components
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker } from '@material-ui/pickers';
import SendIcon from '@material-ui/icons/Send';

// Validation
import { TravelPlanSchemaType } from './validation/types';

// Helpers
import { DEFAULT_FORM_VALUES } from './constants';
import { useStyles } from './styles';
import { Car, Employee, TravelPlan, TravelPlanCreateRequest } from 'api';
import { validate } from './validation';

interface Props {
  readonly cars: Car[];
  readonly employees: Employee[];
  readonly travelPlans: TravelPlan[];
  readonly onSubmit: (values: TravelPlanCreateRequest) => Promise<void>;
}

const TravelPlanForm = ({ cars, employees, travelPlans, onSubmit }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  const classes = useStyles();

  return (
    <div className={classes.formContainer}>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h4" align="center">
            Create a Travel Plan
          </Typography>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            <Formik
              initialValues={DEFAULT_FORM_VALUES}
              validate={(values) =>
                validate(values, cars, employees, travelPlans)
              }
              onSubmit={async (values, actions) => {
                setIsSubmitting(true);

                const createRequest: TravelPlanCreateRequest = {
                  startLocation: values.startLocation!,
                  endLocation: values.endLocation!,
                  startDate: values.startDate!,
                  endDate: values.endDate!,
                  carId: values.carId!,
                  employeeIds: values.employeeIds!,
                };

                await onSubmit(createRequest);

                setIsSubmitting(false);
                actions.setSubmitting(false);
                actions.resetForm();

                // This is neccessary because <Autocomplete> component is still in development
                setSelectedEmployees(DEFAULT_FORM_VALUES.employeeIds);
                setSelectedCar(null);
              }}
            >
              <Form>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12} md={6}>
                    <Field name="startLocation">
                      {({
                        field,
                        meta: { touched, error },
                      }: FieldProps<TravelPlanSchemaType>) => (
                        <TextField
                          {...field}
                          label="Start Location"
                          variant="outlined"
                          fullWidth
                          required
                          error={touched && !!error}
                          helperText={touched && error ? error : ' '}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="endLocation">
                      {({
                        field,
                        meta: { touched, error },
                      }: FieldProps<TravelPlanSchemaType>) => (
                        <TextField
                          {...field}
                          label="End Location"
                          variant="outlined"
                          fullWidth
                          required
                          error={touched && !!error}
                          helperText={touched && error ? error : ' '}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="startDate">
                      {({
                        form,
                        field,
                        meta: { touched, error },
                      }: FieldProps<TravelPlanSchemaType>) => (
                        <KeyboardDatePicker
                          name={field.name}
                          fullWidth
                          autoOk
                          inputVariant="outlined"
                          variant="inline"
                          format="dd.MM.yyyy"
                          label="Start Date"
                          value={field.value}
                          onBlur={(e) => {
                            field.onBlur(e);
                            form.setFieldTouched('startDate');
                            form.setFieldTouched('endDate');
                          }}
                          onClose={() => {
                            form.setFieldTouched('startDate');
                            form.setFieldTouched('endDate');
                          }}
                          onChange={(date) => {
                            form.setFieldValue(field.name, date);
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          error={touched && !!error}
                          helperText={touched && error ? error : ' '}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="endDate">
                      {({
                        form,
                        field,
                        meta: { touched, error },
                      }: FieldProps<TravelPlanSchemaType>) => (
                        <KeyboardDatePicker
                          name={field.name}
                          fullWidth
                          autoOk
                          inputVariant="outlined"
                          variant="inline"
                          format="dd.MM.yyyy"
                          label="End Date"
                          value={field.value}
                          onBlur={(e) => {
                            field.onBlur(e);
                            form.setFieldTouched('startDate');
                            form.setFieldTouched('endDate');
                          }}
                          onClose={() => {
                            form.setFieldTouched('startDate');
                            form.setFieldTouched('endDate');
                          }}
                          onChange={(date) => {
                            form.setFieldValue(field.name, date);
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          error={touched && !!error}
                          helperText={touched && error ? error : ' '}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="carId">
                      {({
                        form,
                        field,
                        meta: { touched, error },
                      }: FieldProps<TravelPlanSchemaType>) => (
                        <>
                          <Autocomplete
                            options={cars}
                            value={selectedCar}
                            getOptionLabel={(option) => {
                              return option.name;
                            }}
                            onChange={(_, newValue) => {
                              form.setFieldValue(field.name, newValue?.carId);
                              setSelectedCar(newValue);
                            }}
                            onBlur={(e) => {
                              field.onBlur(e);
                              form.setFieldTouched(field.name);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                label="Select Car"
                                variant="outlined"
                                error={touched && !!error}
                                helperText={touched && error ? error : ' '}
                              />
                            )}
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="employeeIds">
                      {({
                        form,
                        field,
                        meta: { touched, error },
                      }: FieldProps<TravelPlanSchemaType>) => (
                        <Autocomplete
                          multiple
                          disableCloseOnSelect
                          value={selectedEmployees}
                          options={employees}
                          getOptionLabel={(option) => option.name}
                          filterSelectedOptions
                          onChange={(_, newValue) => {
                            form.setFieldValue(
                              field.name,
                              newValue.map((value) => value.employeeId),
                            );
                            setSelectedEmployees(newValue);
                          }}
                          onBlur={(e) => {
                            field.onBlur(e);
                            form.setFieldTouched(field.name);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Employees"
                              error={touched && !!error}
                              helperText={touched && error ? error : ' '}
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      startIcon={<SendIcon />}
                      fullWidth
                    >
                      {isSubmitting ? (
                        <CircularProgress
                          color="secondary"
                          size={24}
                          thickness={6}
                        />
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TravelPlanForm;
