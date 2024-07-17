import { useMutation } from 'react-query'

import { resetAnswersFromApi } from '../api/api'
import { apiToDomainAnswersConverter } from '../api/converters'
import { useAnswersStore } from '../state'

// TASK 6:
// - You need to implement a new hook called useResetAnswers.
// - Once implemented, you should be able to use this hook in the Table view.

export const useResetAnswers = () => {
    const setAnswers = useAnswersStore(state => state.setAnswers)
    return useMutation({
        mutationFn: async () => await resetAnswersFromApi(),
        onSuccess: ({ data }) => {
            const result = apiToDomainAnswersConverter(data)
            setAnswers(result)
        },
    })
}
