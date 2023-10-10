import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqData = [
    {
      question: "Question 1: What is FAQ?",
      answer: "Answer 1: FAQ stands for Frequently Asked Questions.",
    },
    {
      question: "Question 2: How can I become an EV charger provider?",
      answer:
        "Answer 2: To become an EV charger provider, you can sign up on our platform and list your charging stations for rent. Make sure your charging stations meet our requirements.",
    },
    {
      question: "Question 3: What types of electric vehicles are available for rent?",
      answer:
        "Answer 3: We offer a variety of electric vehicles for rent, including electric cars, electric scooters, and electric bicycles.",
    },
    {
      question: "Question 4: How do I book an electric vehicle?",
      answer:
        "Answer 4: To book an electric vehicle, simply browse our listings, select the vehicle you want, choose your rental dates, and proceed to checkout.",
    },
    {
      question: "Question 5: What payment methods are accepted?",
      answer:
        "Answer 5: We accept various payment methods, including credit cards, debit cards, and digital wallets like Apple Pay and Google Pay.",
    },
    {
      question: "Question 6: Is insurance included in the rental cost?",
      answer:
        "Answer 6: Yes, insurance is included in the rental cost. We provide comprehensive insurance coverage for all rented vehicles.",
    },
    {
      question: "Question 7: What happens if the rented vehicle is damaged during my rental?",
      answer:
        "Answer 7: In case of damage to the rented vehicle, please contact our customer support immediately. We will assist you in handling the situation.",
    },
    {
      question: "Question 8: Can I cancel my booking?",
      answer:
        "Answer 8: Yes, you can cancel your booking. The cancellation policy may vary depending on the rental duration and vehicle type. Please review our cancellation policy for details.",
    },
    {
      question: "Question 9: How can I contact customer support?",
      answer:
        "Answer 9: You can contact our customer support team through the 'Contact Us' page on our website or by sending an email to support@example.com.",
    },
    {
      question: "Question 10: Is roadside assistance available?",
      answer:
        "Answer 10: Yes, we provide roadside assistance for all rented vehicles. If you encounter any issues during your rental, our team is available to assist you.",
    },
  ];  

function FaqCom() {
  const [expanded, setExpanded] = useState(null);

  const handleExpandClick = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(190vh - 120px)", // Adjust the height as needed
        }}
      >
        <Card
          sx={{
            width: "80%", // Adjust the width as needed
            padding: "20px", // Add padding to the card content
          }}
        >
          <Typography variant="h4" gutterBottom>
            Frequently Asked Questions
          </Typography>
          {faqData.map((item, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: "16px",
              }}
            >
              <Paper elevation={3} variant="outlined">
                <Box p={3}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleExpandClick(index)}
                  >
                    {item.question}
                    <IconButton
                      aria-label="expand"
                      size="small"
                      sx={{
                        marginLeft: "auto",
                        transform:
                          expanded === index ? "rotate(180deg)" : "none",
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Typography>
                  <Collapse in={expanded === index}>
                    <Typography variant="body1">{item.answer}</Typography>
                  </Collapse>
                </Box>
              </Paper>
            </Box>
          ))}
        </Card>
      </Box>
    </Container>
  );
}

export default FaqCom;
