import React from 'react';
import Layout from '@src/layouts/PageLayout';
import Answer from '@components/answer';

export default function Index(): JSX.Element {
  return (
    <Layout title="Temp" description="This is a temp page">
      <Answer />
    </Layout>
  );
}
