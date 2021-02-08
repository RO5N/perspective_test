import React from 'react';
import Layout from '@src/layouts/PageLayout';
import Answer from '@components/answer';

const Index = (): JSX.Element => {
  return (
    <Layout title="Temp" description="This is a temp page">
      <Answer />
    </Layout>
  );
};

export default Index;
