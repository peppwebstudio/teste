
import { useState } from 'react'

const questions = [
  {
    title: 'O comportamento observado',
    question: 'Hipoteticamente se uma estudante de medicina te convidasse para um segundo encontro você...',
    options: [
      'Faria o L e aceitaria o convite.',
      'Perguntaria a Freud, porque ele explica tudo!',
      'Hipoteticamente, claro, aceitaria mediante assinatura de contrato.',
      'Me assumiria bolsonarista e negaria.',
    ],
    reactions: [
      'Então, hipoteticamente, claro, seu avô Lula ficaria orgulhoso de você!',
      'Segundo "Cinco Lições de Psicanálise" (1910) de Sigmund Freud: "aceitais o convite porque eu expliquei que sim!".',
      'Excelente! Escuta aí o barulho dos fogos de artifício no Curado 2, hipoteticamente, claro.',
      'Vovô Lula não ficaria muito feliz... mas mylle entenderia!',
    ],
  }
]

const evidence = [
  {
    number: '001',
    title: 'O almoço',
    description:
      'Duas estudantes universitárias foram vistas almoçando juntas. A conversa aparentemente não foi um desastre.',
    stamp: 'SUSPEITO DE SUCESSO',
  },
  {
    number: '002',
    title: 'O Contato',
    description:
      'Foi identificado um breve contato labial ao final do encontro. O departamento solicita mais informações.',
    stamp: 'MATERIAL DE INTERESSE',
  },
  {
    number: '003',
    title: 'O próximo encontro',
    description:
      'Fontes altamente confiáveis confirmaram o interesse em repetir a experiência.',
    stamp: 'CASO REABERTO',
  },
]

const contractClauses = [
  {
    number: '01',
    title: 'OBJETO DO CONTRATO',
    text: 'A paciente concorda em assistir a um filme de terror na quarta-feira.',
  },
  {
    number: '02',
    title: 'RESPONSABILIDADE TÉCNICA',
    text: 'A acompanhante responsável pela proposta declara não possuir preparo psicológico para cenas de suspense.',
  },
  {
    number: '03',
    title: 'REGULAÇÃO EMOCIONAL',
    text: 'A cada susto sofrido pela acompanhante, fica autorizada a solicitação de um beijo para fins de regulação emocional.',
  },
  {
    number: '05',
    title: 'CLÁUSULA DE IMPREVISIBILIDADE',
    text: 'A quantidade de sustos é imprevisível. A quantidade de oportunidades de flerte também.',
  },
]

function Button({
  children,
  onClick,
  secondary = false,
  disabled = false,
}) {
  return (
    <button
      className={`action-button ${secondary ? 'secondary-button' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function Header({ step }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">MJ</span>
        <span>MJ SPECIAL INVESTIGATIONS</span>
      </div>
      <span className="case-number">CASE Nº 002</span>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${((step + 1) / 8) * 100}%` }}
        />
      </div>
    </header>
  )
}


function Michael({ children }) {
  return (
    <div className="michael-message">
      <div className="detective-icon" aria-hidden="true">
        <img
          className="michael-image"
          src="/michael.png"
          alt=""
        />
      </div>

      <div className="speech">
        <span className="eyebrow">MR. M. JACKSON</span>
        <p>{children}</p>
      </div>
    </div>
  )
}


export default function App() {
  const [step, setStep] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [accepted, setAccepted] = useState(false)
  const [contractSigned, setContractSigned] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  function nextQuestion() {
    setAnswer(null)

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      setStep(3)
    }
  }

  function acceptInvitation() {
    setAccepted(true)
    setContractSigned(false)
    setStep(6)
  }

  function declineForNow() {
    setAccepted(false)
    setStep(7)
  }

  function signContract() {
    setContractSigned(true)
    setStep(7)
  }

  function restart() {
    setStep(0)
    setQuestionIndex(0)
    setAnswer(null)
    setAccepted(false)
    setContractSigned(false)
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Header step={step} />

      <section className="content" key={step}>
        {step === 0 && (
          <div className="hero">
            <div className="classified">TOP SECRET · CONFIDENTIAL</div>

          <div className="hero-symbol" aria-hidden="true">
            <img
              src="/michaelfrente.png"
              alt=""
              className="hero-michael-image"
            />
          </div>

            <p className="eyebrow red-text">AN UNEXPECTED INVESTIGATION</p>

            <h1>
              OPERATION:
              <br />
              <span>ONE MORE DATE</span>
            </h1>

            <div className="red-rule" />

            <p className="hero-copy">
              Anna Clara, Michael Jackson precisa da sua ajuda para resolver este caso!
              <br />
              <span></span>
            </p>

            <div className="subject-card">
              <span className="eyebrow">INVESTIGADA</span>
              <strong>ANNA CLARA</strong>
              <span>Psicologia · 4º período</span>
              <span className="subject-status">
                INTERESSE INTERPESSOAL SUSPEITO
              </span>
            </div>

            <p className="disclaimer">
              Esta investigação pode causar risadas, flerte e vontade de sair
              de casa numa quarta-feira.
            </p>

            <Button onClick={() => setStep(1)}>ACEITAR MISSÃO ↗</Button>
          </div>
        )}

        {step === 1 && (
          <>
            <p className="eyebrow red-text">CAPÍTULO 01 · EVIDENCE LOG</p>

            <h2>
              A cena do <span>encontro.</span>
            </h2>

            <Michael>
              Anna Clara, meu nome é Michael Jackson. Talvez você me conheça
              da música, do moonwalk ou de Thriller. Hoje, porém, estou
              investigando um caso muito mais sério. Trouxe aqui as 3 maiores pistas que encontramos para desvendar esse mistério e descobrir se a suspeita topa um segundo encontro!
            </Michael>

            <div className="evidence-list">
              {evidence.map((item) => (
                <article className="evidence-card" key={item.number}>
                  <div className="evidence-number">{item.number}</div>

                  <div className="evidence-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="evidence-stamp">{item.stamp}</span>
                  </div>

                  <span className="evidence-check">✓</span>
                </article>
              ))}
            </div>

            <Michael>
              Três evidências, mas ainda sem nenhuma conclusão ou evidências concretas.
              Por tal motivo, a sehorita foi intimada a prestar depoimento para um melhor esclarescimento do caso.
              <br />
              <br />
            
            </Michael>

            <Button onClick={() => setStep(2)}>
              COMEÇAR O INTERROGATÓRIO →
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="eyebrow red-text">
              CAPÍTULO 02 · DEPARTMENTO PSICOLÓGICO
            </p>



            <h2>
              INTERROGATÓRIO DA <span>SUSPEITA.</span>
            </h2>

            <div className="question-card">
              <span className="eyebrow">
                AVALIAÇÃO TOTALMENTE QUESTIONÁVEL
              </span>

              <h3>{questions[questionIndex].title}</h3>
              <p>{questions[questionIndex].question}</p>

              <div className="options-list">
                {questions[questionIndex].options.map((option, index) => (
                  <button
                    key={option}
                    className={`option-button ${
                      answer?.index === index ? 'selected' : ''
                    }`}
                    onClick={() =>
                      setAnswer({
                        index,
                        feedback: questions[questionIndex].reactions[index],
                      })
                    }
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>{option}</span>
                    <span className="option-arrow">↗</span>
                  </button>
                ))}
              </div>

              {answer && (
                <div className="reaction-box">
                  <span className="eyebrow red-text">
                    ANÁLISE DO INVESTIGADOR
                  </span>

                  <p>{answer.feedback}</p>

                  <Button onClick={nextQuestion}>
                    {questionIndex < 2
                      ? 'SEGUIR INVESTIGAÇÃO →'
                      : 'REVELAR RESULTADO →'}
                  </Button>
                </div>
              )}
            </div>

            <p className="disclaimer">
              Esta avaliação não
              possui validade científica, não substitui acompanhamento
              psicológico e pode resultar em encontros recorrentes.
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <p className="eyebrow red-text">CAPÍTULO 03 · LAUDO OFICIAL</p>

            <h2>
              O laudo <span>final.</span>
            </h2>

            <div className="report">
              <div className="report-top">
                <span>MJ INVESTIGATIONS</span>
                <span>DOCUMENTO Nº 004-AC</span>
              </div>

              <div className="report-stamp">INCONCLUSIVO</div>

              <span className="eyebrow">RESULTADO DA INVESTIGAÇÃO</span>
              <h3>Hipótese principal</h3>

              <p>
                Há indícios fortíssimos de que um segundo encontro seja uma excelente ideia.
              </p>

              <div className="report-divider" />

              <span className="eyebrow">CONDUTA RECOMENDADA</span>

              <p>
                Prosseguir para um segundo encontro, contando com a presença de pipoca, uma tela
                de cinema e um filme de terror.
              </p>

              <div className="report-signature">
                M. Jackson · Investigador
              </div>
            </div>

            <Michael>
              Atenção, a equipe de pesquisa e investigação responsável por este interrogatório somente fez o frontend do proojeto (a parte bonitinha e tals..) Então se possível, eu, Michael Jackson, agradeceria muito se ao fim da investigação você compartilhasse suas reações com a tal da programadora. Obrigado!
            </Michael>

            <Button onClick={() => setStep(4)}>
              REVELAR A PRÓXIMA EVIDÊNCIA →
            </Button>

            <p className="disclaimer">
              Aparentemente Freud explica tudo, menos o nervosismo de chamar uma
              menina bonita pro cinema
            </p>
          </>
        )}

        {step === 4 && (
          <>
            <p className="eyebrow red-text">
              CAPÍTULO 04 · PROCEDIMENTO DEMOCRÁTICO
            </p>

            <div className="big-l">L</div>

            <h2>
              Uma decisão <span>histórica.</span>
            </h2>

            <Michael>
              Antes de revelar o plano, precisamos concluir uma etapa
              fundamental do processo democrático. A comissão do segundo
              encontro precisa votar.
            </Michael>

            <div className="ballot">
              <span className="eyebrow">CÉDULA OFICIAL Nº 013</span>

              <div className="ballot-option muted-option">
                <span>○</span> CANCELAR A INVESTIGAÇÃO
              </div>

              <div className="ballot-option winning-option">
                <span>✓</span> FAZER O L E IR AO CINEMA
              </div>

              <p className="political-punchline">
                PROJETO APROVADO POR 13 VOTOS A ZERO.
              </p>

              <Button onClick={() => setStep(5)}>
                CONFIRMAR VOTO ↗
              </Button>
            </div>

            <p className="political-punchline">
              L de LET'S GO TO THE MOVIES.
              <br />
              <span>
               
              </span>
            </p>
          </>
        )}

        {step === 5 && (
          <>
            <p className="eyebrow red-text">
              CAPÍTULO 05 · OPERAÇÃO THRILLER
            </p>

           

            <h2>
              Uma proposta <span>assustadora.</span>
            </h2>

            <Michael>
              Anna Clara, a suspeita deseja levar você ao cinema na próxima
              quarta-feira, dia 21 de outubro. O filme será de terror, seu
              gênero favorito... Mesmo diante do risco da suposta adulta estudante de medicina perder toda sua dignidade vendo um filme de terror.
            </Michael>

            <div className="courage-card">
              <div className="courage-heading">
                <span className="eyebrow">
                  NÍVEL DE CORAGEM DA ACOMPANHANTE
                </span>
                <strong>13%</strong>
              </div>

              <div className="courage-track">
                <div className="courage-fill" />
              </div>

              <p>
                Estimativa preliminar. Pode cair para valores negativos
                durante o decorrer do filme. E aumentar para valores positivos mediante auxílio de carinho de uma psicóloga aí... 
              </p>
            </div>

            <div className="invitation-card">
              <span className="eyebrow red-text">
                CONVITE OFICIAL · CASO Nº 002
              </span>

              <h3>
                ANNA CLARA,
                <br />
                TOPA IR AO CINEMA?
              </h3>

              <div className="invitation-details">
                <span>◷ QUARTA-FEIRA, 21 DE OUTUBRO</span>
                <span>▣ FILME DE TERROR · "OUTRA MAMÃE"</span>
                <span>♥ COMPANHIA SUSPEITAMENTE AGRADÁVEL</span>
              </div>

              <div className="report-divider" />

              <p>
                ATENÇÃO!! Foi estabelecido um protocolo de segurança para lidar com essa situação.

A cada susto, a acompanhante poderá solicitar suporte emocional. A forma de suporte preferida pela equipe de pesquisa é um beijo.

Naturalmente, isso dependerá da aprovação da outra parte. Somos profissionais, afinal.
              </p>

              <div className="invitation-actions">
                <Button onClick={acceptInvitation}>
                  SIM, DETETIVE JACKSON! ♥
                </Button>

                <Button secondary onClick={declineForNow}>
                  PRECISO PENSAR
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 6 && accepted && (
          <>
            <p className="eyebrow red-text">
              CAPÍTULO 06 · ACORDO LEGALMENTE DUVIDOSO
            </p>

            <h2>
              O contrato <span>antissustos.</span>
            </h2>

            <Michael>
              Excelente decisão, investigada. Antes de encerrar o caso,
              o departamento exige a assinatura de um documento oficial.
              Não se preocupe: nosso departamento jurídico é composto por
              uma estudante de Medicina e um Michael Jackson imaginário.
            </Michael>

            <div className="invitation-card contract-document">
              <div className="report-top">
                <span>MJ INVESTIGATIONS</span>
                <span>CONTRATO Nº 021-TH</span>
              </div>

              <div className="report-stamp">DOCUMENTO CONFIDENCIAL</div>

              <p className="contract-department">
                DEPARTAMENTO DE ENCONTROS E CONTROLE EMOCIONAL
              </p>

              <h3 className="contract-title">CONTRATO DE SOBREVIVÊNCIA</h3>

              <p className="contract-intro">
                Pelo presente instrumento de intenções duvidosas, ficam estabelecidos
                os termos e as condições para a realização do encontro cinematográfico
                entre as partes envolvidas.
              </p>

              <div className="contract-text">
                <p>
                  <strong>Cláusula 1. — Do objeto.</strong> A paciente concorda em
                  assistir a um filme de terror na quarta-feira à tarde, dia 21 de outubro
                  de 2026, no shopping Guararapes mesmo.
                </p>

                <p>
                  <strong>Cláusula 2. — Da responsabilidade técnica.</strong> A
                  acompanhante responsável pela proposta declara não possuir preparo
                  psicológico adequado para cenas de suspense, sustos repentinos ou
                  aparições inesperadas na tela.
                </p>

                <p>
                  <strong>Cláusula 3. — Da regulação emocional.</strong> A cada susto
                  sofrido pela acompanhante, fica autorizada a solicitação de um beijo
                  para fins de regulação emocional, conforto psicológico e continuidade
                  segura da investigação.
                </p>

                <p>
                  <strong>Cláusula 4. — Da imprevisibilidade.</strong> A quantidade
                  de sustos durante a sessão é imprevisível. A quantidade de
                  oportunidades de flerte também. O departamento não se responsabiliza
                  por eventuais borboletas no estômago.
                </p>
              </div>

              <div className="report-divider" />

              <p className="contract-question">
                <strong>Anna Clara, você aceita os termos?</strong>
              </p>

              <label className="contract-consent">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                />
                <span>Li e concordo com os termos e condições do encontro.</span>
              </label>

              <div className="invitation-actions">
                <Button onClick={signContract} disabled={!termsAccepted}>
                  ✍ ASSINAR CONTRATO
                </Button>

                <Button
                  secondary
                  onClick={() => setStep(5)}
                >
                  REVISAR O CONVITE
                </Button>
              </div>

              <p className="disclaimer">
                
              </p>
            </div>
          </>
        )}

        {step === 7 && (
          <div className="final-screen">
            <div className="final-star">✦</div>

            <p className="eyebrow red-text">
              FINAL REPORT · CASE Nº 002
            </p>

            {accepted && contractSigned ? (
              <>
                <h1>
                  CASO
                  <br />
                  <span>ENCERRADO!</span>
                </h1>

                <Michael>
                  A investigação foi um sucesso! O contrato foi assinado.
                  A ciência avançou. A democracia venceu. Agora, boa sorte pra Mylle e bom filme, detetive Anna!
                  
                </Michael>

                <div className="final-card">
                  <span className="eyebrow">PRÓXIMA MISSÃO</span>

                  <h3>Até quarta, Anna Clara ❤️</h3>

                  <p>
                    Escolher o filme, comprar a pipoca e descobrir se a
                    acompanhante vai sobreviver aos sustos.
                  </p>

                  <div className="report-divider" />

                  <span className="evidence-stamp">
                    CONTRATO ANTISSUSTOS: ASSINADO
                  </span>
                </div>

                <p className="final-note">
                  Investigação conduzida por Michael Jackson.
                  <br />
                  Convite elaborado por uma estudante de Medicina tentando
                  disfarçar a timidez com programação.
                </p>
              </>
            ) : (
              <>
                <h1>
                  CASO
                  <br />
                  <span>EM ANÁLISE.</span>
                </h1>

                <p className="hero-copy">
                  Tudo bem, Anna Clara. Nenhuma pressão, nenhuma obrigação.
                  Convites bons também respeitam o tempo de quem recebe.
                </p>

                <Michael>
                  Freud recomendaria reflexão. Eu recomendo que você faça
                  o que tiver vontade. A investigação pode esperar.
                </Michael>

                <Button secondary onClick={restart}>
                  REVER A INVESTIGAÇÃO ↺
                </Button>
              </>
            )}

            <div className="final-footer">
              THIS IS IT. · MJ SPECIAL INVESTIGATIONS
            </div>
          </div>
        )}
      </section>

      {step > 0 && step < 7 && (
        <button
          className="back-button"
          onClick={() => {
            if (step === 2 && questionIndex > 0) {
              setQuestionIndex(questionIndex - 1)
              setAnswer(null)
            } else if (step === 6) {
              setStep(5)
            } else {
              setStep(step - 1)
            }
          }}
        >
          ← VOLTAR
        </button>
      )}

      <footer className="site-footer">
        <span>MJ SPECIAL INVESTIGATIONS</span>
        <span>CONFIDENTIAL · EST. 2026</span>
      </footer>
    </main>
  )
}
