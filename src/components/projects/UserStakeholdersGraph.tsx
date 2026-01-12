import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import './UserStakeholdersGraph.css';

// Semantic Role Colors (Matching graph-theme.css logic)
const ROLE_COLORS = {
    DECISION: '#00B3C7',   // Teal - Directors
    MANAGEMENT: '#F7941D', // Orange - Managers
    OPERATION: '#27AE60',  // Green - Operators
};

// Tag mapping for dot colors using the semantic constants
const getDotStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
        case 'input': return { backgroundColor: ROLE_COLORS.OPERATION };     // Operator
        case 'plan': return { backgroundColor: ROLE_COLORS.MANAGEMENT };   // Manager
        case 'read': return { backgroundColor: ROLE_COLORS.DECISION };     // Director
        default: return {};
    }
};



// Interface for type safety
interface Subgroup {
    names: string;
    title: string;
}

interface StakeholderGroup {
    layer_name: string;
    name: string; // "Decision Makers"
    role_title: string;
    subgroups: Subgroup[];
    tags: string[];
    context: string;
}

interface Props {
    onFilterChange?: (tag: string | null) => void;
}

export const UserStakeholdersGraph = ({ onFilterChange }: Props) => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Cast the array from translation
    const groups = t('project_p.research.stakeholders.groups', { returnObjects: true }) as StakeholderGroup[];

    const toggleAccordion = (index: number) => {
        const newIndex = openIndex === index ? null : index;
        setOpenIndex(newIndex);

        if (onFilterChange) {
            if (newIndex !== null) {
                // Determine filter tag from the group (e.g. primary tag)
                const group = groups[index];
                const filterTag = group.tags[0];
                onFilterChange(filterTag);
            } else {
                // Collapsed = reset filter
                onFilterChange(null);
            }
        }
    };

    return (
        <div className="stakeholders-container">
            <div className="stakeholders-header">

                <div className="interaction-hint">
                    <ArrowDown size={18} />
                    <span>Tap a group to reveal their pain points below.</span>
                </div>
            </div>

            <div className="stakeholders-accordion-wrapper">
                {groups && groups.map((group, index) => {
                    const isOpen = openIndex === index;
                    // Tag for header icon is usually the first one (primary interaction)
                    const primaryTag = group.tags[0];

                    return (
                        <div key={index} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                            <button
                                className="accordion-header"
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className="header-left">
                                    <span
                                        className="status-dot"
                                        style={getDotStyle(primaryTag)}
                                    ></span>

                                    <span className="header-title">{group.name}</span>
                                </div>
                                <div className="header-right">
                                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                            </button>

                            <div className="accordion-content">
                                <div className="content-inner">
                                    <div className="group-role-title">{group.role_title}</div>

                                    <div className="people-list">
                                        {group.subgroups && group.subgroups.map((sub, i) => (
                                            <div key={i} className="people-item">
                                                <div className="people-names">{sub.names}</div>
                                                <div className="people-title">{sub.title}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="group-context">
                                        {group.context}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
