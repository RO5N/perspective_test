import React from 'react';
import Layout from '@src/layouts/PageLayout';
import Answer from '@components/answer';

const Index = (): JSX.Element => {
  return (
    <Layout title="Results" description="Find out your perspective results">
      <Answer />
    </Layout>
  );
};

export default Index;
