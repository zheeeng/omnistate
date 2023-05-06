import { visibilityFilterHooks } from '../store/visibility-filter'

export function VisibilityFilters ()  {
    const visibilityFilters = visibilityFilterHooks.useVisibilityFilters()

    return (
        <ul
            display="flex"
            justify="center"
            space="x-4"
            flex="grow"
        >
            {visibilityFilters.map(visibilityFilter => (
                <li
                    key={`visibility-filter-${visibilityFilter.filter}`}
                >
                    <button
                        text="capitalize"
                        p="x-8px y-4px"
                        border={`rounded-md opacity-70 1px ${visibilityFilter.isActive ? 'pink-200' : 'transparent'}`}
                        onClick={visibilityFilter.active}
                    >
                        {visibilityFilter.filter}
                    </button>
                </li>
            ))}
        </ul>
    )
}
