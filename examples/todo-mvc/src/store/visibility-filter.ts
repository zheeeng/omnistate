import React from 'react'
import { createContext } from '@omnistate/context'

export const VISIBILITY_FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
}

export const [VisibilityFilterProvider, visibilityFilterHooks] = createContext(
    function useVisibilityFilter () {
        const [currentVisibilityFilter, setCurrentVisibilityFilter] = React.useState(VISIBILITY_FILTERS.ALL)

        const visibilityFilters = React.useMemo(
            () => Object.values(VISIBILITY_FILTERS).map(filter => ({
                isActive: filter === currentVisibilityFilter,
                filter,
                active: () => setCurrentVisibilityFilter(filter),
            })),
            [currentVisibilityFilter],
        )

        return {
            currentVisibilityFilter,
            visibilityFilters,
        }
    }
)
