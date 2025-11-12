import FaqSubpage from '@/components/services/subpages/FaqSubpage';
import { createServiceSubpageStaticProps } from '@/lib/serviceSubpagePage';

export default FaqSubpage;
export const getStaticProps = createServiceSubpageStaticProps('immigrant-job');
