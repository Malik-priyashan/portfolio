import { Html, Head, Body, Container, Section, Text } from '@react-email/components';

export default function EmailTemplate({ name, email, message }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text><strong>Name:</strong> {name}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>Message:</strong><br />{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
