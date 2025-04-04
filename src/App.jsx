import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card, Navbar, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faLightbulb, faPaperPlane, faFileAlt, faRobot } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [topic, setTopic] = useState("");
  const [essay1, setEssay1] = useState("");
  const [essay2, setEssay2] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Write an essay on ${topic} and make it sound like ${essay1} and ${essay2} in 10 words.` },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;

      setAiResponse(botMessage);
    } catch (error) {
      console.error("Error:", error);
    }

  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ 
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%)"
    }}>
      {/* Navbar */}
      <Navbar style={{ backgroundColor: "#6a11cb" }} variant="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <FontAwesomeIcon icon={faBook} className="me-2" />
            <span className="fw-bold">Essay Comparison Tool</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
      
      <Container className="py-5 flex-grow-1">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center fw-bold" style={{ color: "#4a4a4a" }}>
              <FontAwesomeIcon icon={faLightbulb} className="me-2" style={{ color: "#f5b041" }} />
              Compare Essays with AI Analysis
            </h2>
            <p className="text-center text-muted">
              Enter your essay topic and paste two essays to compare them using AI analysis
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {/* Left side - Form */}
          <Col lg={6}>
            <Card className="shadow h-100" style={{ 
              borderRadius: "12px", 
              borderColor: "#e0e0e0",
              overflow: "hidden"
            }}>
              <Card.Header className="py-3" style={{ 
                backgroundColor: "#6a11cb", 
                borderBottom: "none"
              }}>
                <h4 className="m-0 fw-bold text-white d-flex align-items-center">
                  <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                  Essay Input
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Topic</Form.Label>
                    <Form.Control
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Enter the essay topic"
                      required
                      className="shadow-sm"
                      style={{ 
                        borderColor: "#e0e0e0", 
                        padding: "0.75rem",
                        transition: "all 0.2s ease-in-out"
                      }}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <span className="d-flex align-items-center">
                        Essay 1
                        <span className="ms-2 badge" style={{ backgroundColor: "#6a11cb" }}>Primary</span>
                      </span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={essay1}
                      onChange={(e) => setEssay1(e.target.value)}
                      placeholder="Paste the first essay here"
                      required
                      className="shadow-sm"
                      style={{ 
                        borderColor: "#e0e0e0", 
                        padding: "0.75rem",
                        transition: "all 0.2s ease-in-out"
                      }}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <span className="d-flex align-items-center">
                        Essay 2
                        <span className="ms-2 badge" style={{ backgroundColor: "#2575fc" }}>Secondary</span>
                      </span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={essay2}
                      onChange={(e) => setEssay2(e.target.value)}
                      placeholder="Paste the second essay here"
                      required
                      className="shadow-sm"
                      style={{ 
                        borderColor: "#e0e0e0", 
                        padding: "0.75rem",
                        transition: "all 0.2s ease-in-out"
                      }}
                    />
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={isLoading}
                      className="py-3"
                      style={{ 
                        background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", 
                        border: "none",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                          SUBMIT
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Right side - AI Response */}
          <Col lg={6}>
            <Card 
              className="shadow h-100" 
              style={{ 
                borderRadius: "12px",
                borderColor: "#e0e0e0",
                overflow: "hidden"
              }}
            >
              <Card.Header className="py-3" style={{ 
                background: "linear-gradient(to right, #2575fc 0%, #6a11cb 100%)", 
                borderBottom: "none"
              }}>
                <h4 className="m-0 fw-bold text-white d-flex align-items-center">
                  <FontAwesomeIcon icon={faRobot} className="me-2" />
                  AI Analysis
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="p-2" style={{ color: "#4a4a4a" }}>
                  <div className="mb-3 p-2 rounded" style={{ backgroundColor: "rgba(106, 17, 203, 0.05)" }}>
                    <strong>Topic:</strong> {topic}
                  </div>
                  <div className="analysis-content" style={{ whiteSpace: "pre-line" }}>
                    {aiResponse}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <footer className="py-3 mt-auto" style={{ backgroundColor: "#f8f9fa" }}>
        <Container>
          <p className="text-center text-muted mb-0">
            Essay Comparison Tool &copy; {new Date().getFullYear()}
          </p>
        </Container>
      </footer>
    </div>
  );
}
