import React from 'react';
import Layout from '@src/layouts/PageLayout';
import Home from '@components/question';

export default function Index(): JSX.Element {
  return (
    <Layout title="Temp" description="This is a temp page">
      <Home />
    </Layout>
  );
}