import { getAllServices } from './services';
import type { CaseItem } from '@/types/service';

export interface ExtendedCaseItem extends CaseItem {
    serviceSlug: string;
    serviceTitle: string;
}

/**
 * Fetches all case studies from all services.
 * Useful for building a central Case Studies library or dynamic recommendations.
 */
export function getAllCaseStudies(locale: string = 'en-GB'): ExtendedCaseItem[] {
    const services = getAllServices(locale);
    const allCases: ExtendedCaseItem[] = [];

    services.forEach((service) => {
        if (service.cases?.items && Array.isArray(service.cases.items)) {
            service.cases.items.forEach((c) => {
                allCases.push({
                    ...c,
                    serviceSlug: service.slug,
                    serviceTitle: service.title || service.slug,
                });
            });
        }
    });

    return allCases;
}

/**
 * Client-side hook/logic suggestion for dynamic recommendation:
 * 
 * 1. user visits /services/career-return -> localStorage.setItem('last_interest', 'career-return')
 * 2. home page reads 'last_interest'
 * 3. filter allCases.filter(c => c.serviceSlug === last_interest)
 * 4. display top 3
 */
