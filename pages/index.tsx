import React from 'react';
import Layout from '@src/layouts/PageLayout';
import Home from '@components/question';

export default function Index(): JSX.Element {
  return (
    <Layout title="Perspective Test" description="Answer the questions to find your perspective">
      <Home />
    </Layout>
  );
}
