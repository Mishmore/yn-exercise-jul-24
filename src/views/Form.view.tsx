import { yupResolver } from '@hookform/resolvers/yup'
import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
} from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useUpdateAnswers } from '../api-hooks/useUpdateAnswers'
import { CheckboxGroup } from '../components'
import { DomainOption } from '../domain/types'
import { useAnswersStore } from '../state'

import { validationSchema } from './Form.config'

type InterestId = {
    id: string
}

type InterestAttrs = {
    label: string
    checked: boolean
}

type InterestsOptionsProps = InterestId & InterestAttrs

const optionsToApiConverter = (
    arr: Array<InterestsOptionsProps>,
): Array<DomainOption> =>
    arr.map(elm => ({
        [elm.id]: { label: elm.label, isChecked: !!elm.checked },
    }))

const apiToOptionsConverter = (
    arr: Array<DomainOption>,
): Array<InterestsOptionsProps> =>
    arr.map(elm => ({
        id: Object.keys(elm)[0],
        label: Object.values(elm)[0]?.label,
        checked: Object.values(elm)[0]?.isChecked,
    }))

export const FormView = () => {
    const answers = useAnswersStore(state => state.getAnswers())
    const [interestsOptionsProps, setInterestsOptionsProps] = useState<
        Array<InterestsOptionsProps>
    >([])

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            age: answers.age,
            name: answers.name,
            mail: answers.mail,
            interests: apiToOptionsConverter(answers.interests),
        },
    })

    const updateAnswersMutation = useUpdateAnswers()

    useEffect(() => {
        setInterestsOptionsProps(apiToOptionsConverter(answers.interests))
    }, [answers.interests])

    const onChangeInterests = (
        values: Array<InterestId & Partial<InterestAttrs>>,
    ) => {
        setInterestsOptionsProps(
            values.map(elm => ({
                id: elm.id,
                label: elm?.label ?? '',
                checked: elm?.checked ?? false,
            })),
        )
        return values
    }

    const onSubmit = handleSubmit(formData => {
        updateAnswersMutation.mutate({
            name: formData.name,
            mail: formData.mail,
            age: formData.age,
            interests: optionsToApiConverter(formData.interests),
        })
    })

    return (
        <Container id="form-view" sx={{ width: { xs: '100%', md: '300px' } }}>
            <Box
                display="flex"
                gap={4}
                sx={{
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <Controller
                    name="name"
                    control={control}
                    defaultValue={answers.name}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label="Name"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                            helperText={errors.name?.message || ''}
                            error={Boolean(errors.name?.message)}
                        />
                    )}
                />
                <Controller
                    name="age"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label="Age"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                            helperText={errors.age?.message || ''}
                            error={Boolean(errors.age?.message)}
                        />
                    )}
                />
                <Controller
                    name="mail"
                    control={control}
                    defaultValue={answers.mail}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label="Email"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                            helperText={errors.mail?.message || ''}
                            error={Boolean(errors.mail?.message)}
                        />
                    )}
                />
                {/*
                    TASK 2:
                    - Integrate CheckboxGroup into the form, controlled
                    by react-hook-form.
                    - Ensure the form's initial state is properly
                    configured to kickstart the form's state cycle.
                    - Do NOT modify types of answers.interests or
                    CheckboxGroup's options. This could be detrimental
                    to your final assessment.
                */}
                <Controller
                    name="interests"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <CheckboxGroup
                            label="Interests"
                            helperText={errors.interests?.message}
                            error={Boolean(errors.interests?.message)}
                            options={interestsOptionsProps}
                            onChange={value => {
                                onChange(onChangeInterests(value))
                            }}
                        />
                    )}
                />
                <Box sx={{ position: 'relative' }}>
                    <Button
                        variant="contained"
                        disabled={!isValid || updateAnswersMutation.isLoading}
                        onClick={onSubmit}
                        fullWidth
                    >
                        Submit
                    </Button>
                    {updateAnswersMutation.isLoading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Container>
    )
}
