import ProcessSubpage from '@/components/services/subpages/ProcessSubpage';
import { createServiceSubpageStaticProps } from '@/lib/serviceSubpagePage';

export default ProcessSubpage;
export const getStaticProps = createServiceSubpageStaticProps('immigrant-job');
