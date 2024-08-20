import { Text, View, Font } from "@react-pdf/renderer";
import React, { useRef } from "react";
import LinkContent from "./LinkContent";
import { displayedresumeThemesTranslations } from "../../../../locales/displayedresumeThemesTranslations";

const PersonalInfo = ({ label, value, t }) => {
  return (
    <View style={{ marginBottom: "5px" }}>
      <Text
        style={{
          fontSize: "10px",
          color: "#fff",
          fontWeight: "500",
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        {t[label]}
      </Text>
      {label === "linkedin" ? (
        <LinkContent displayLabel={value} value={value} color={"#fff"} />
      ) : (
        <Text
          style={{
            fontSize: "10px",
            fontWeight: "500",
            whiteSpace: "normal",
            wordBreak: "break-word",
            color: "#fff",
            opacity: "0.8",
            marginTop: "2px",
            overflow: label === "linkedin" ? "hidden" : "inherit",
            width: label === "linkedin" ? "120px" : "auto",
          }}
        >
          {value}
        </Text>
      )}
    </View>
  );
};

const SectionTitle = ({ label, darkenedColor }) => {
  return (
    <View
      style={{
        backgroundColor: darkenedColor,
        padding: "5px 10px",
        marginBottom: "4px",
        marginTop: "4px",
      }}
    >
      <Text style={{ fontSize: "11px", color: "#fff", fontWeight: "500" }}>
        {label}
      </Text>
    </View>
  );
};

function darkenColor(color, amount) {
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);

  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  return (
    (usePound ? "#" : "") +
    ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
  );
}

export const BlueAndWhitePdf = ({
  resumeData,
  sectionsVisibility,
  fullNameColor,
  styles,
  language,
}) => {
  const t =
    displayedresumeThemesTranslations[language] ||
    displayedresumeThemesTranslations.en;
  const darkenedColor = darkenColor(fullNameColor, -40);

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          minHeight: "100vh",
          height: "auto",
        }}
      >
        <View
          style={{
            backgroundColor: fullNameColor,
            width: "30%",
            paddingTop: "15px",
            height: "100%",
            paddingBottom: "15px",
            ...styles.secondPage,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: "22px",
              marginBottom: "8px",
              whiteSpace: "normal",
              wordBreak: "break-word",
              display: "block",
              paddingLeft: "10px",
              paddingRight: "15px",
            }}
          >
            {resumeData.fullName || ""}
          </Text>
          <Text
            style={{
              color: "#fff",
              opacity: 0.8,
              marginBottom: "8px",
              fontSize: "12px",
              fontWeight: "400",
              display: "block",
              whiteSpace: "normal",
              wordBreak: "break-word",
              paddingLeft: "10px",
              paddingRight: "15px",
            }}
          >
            {resumeData.professionalTitle || ""}
          </Text>
          {/* Personal Info */}
          <SectionTitle label={t.personalInfo} darkenedColor={darkenedColor} />
          <View style={{ paddingLeft: "10px", paddingRight: "15px" }}>
            <PersonalInfo
              value={resumeData.location || ""}
              label="location"
              t={t}
            />
            <PersonalInfo value={resumeData.phone || ""} label="phone" t={t} />
            <PersonalInfo value={resumeData.email || ""} label="email" t={t} />
            <PersonalInfo
              value={resumeData.linkedin || ""}
              label="linkedin"
              t={t}
            />
          </View>
          {/* SKILLS */}
          <SectionTitle label={t.skills} darkenedColor={darkenedColor} />
          <View style={{ paddingLeft: "10px", paddingRight: "15px" }}>
            {resumeData.skills.map((skill, index) => (
              <View
                key={index}
                style={{
                  marginBottom: "4px",
                }}
              >
                <Text
                  style={{
                    ...styles.blueAndWhiteText,
                    opacity: "0.8",
                  }}
                >
                  {skill}
                </Text>
              </View>
            ))}
          </View>

          {/* Hobbies */}
          {sectionsVisibility.hobbies && (
            <>
              <SectionTitle label={t.hobbies} darkenedColor={darkenedColor} />
              <View style={{ paddingLeft: "10px", paddingRight: "15px" }}>
                {resumeData.hobbies.map((hobby, index) => (
                  <View key={index} style={{ marginBottom: "4px" }}>
                    <Text
                      style={{
                        ...styles.blueAndWhiteText,
                        opacity: "0.8",
                      }}
                    >
                      {hobby}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Software */}
          {sectionsVisibility.software && (
            <>
              <SectionTitle label={t.software} darkenedColor={darkenedColor} />
              <View style={{ paddingLeft: "10px", paddingRight: "15px" }}>
                {resumeData.software.map((software, index) => (
                  <View key={index} style={{ marginBottom: "4px" }}>
                    <Text
                      style={{
                        ...styles.blueAndWhiteText,
                        opacity: "0.8",
                      }}
                    >
                      {software}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Languages */}
          {sectionsVisibility.languages && (
            <>
              <SectionTitle label={t.languages} darkenedColor={darkenedColor} />
              <View style={{ paddingLeft: "10px", paddingRight: "15px" }}>
                {resumeData.languages.map((language, index) => (
                  <View key={index} style={{ marginBottom: "4px" }}>
                    <Text
                      style={{
                        ...styles.blueAndWhiteText,
                        opacity: "0.8",
                      }}
                    >
                      {language}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Extra Sections */}
          {sectionsVisibility.extraSection && (
            <>
              <SectionTitle
                label={t.extraSections}
                darkenedColor={darkenedColor}
              />
              <View style={{ paddingLeft: "10px", paddingRight: "15px" }}>
                {resumeData.extraSection.map((extra, index) => (
                  <View key={index} style={{ marginBottom: "4px" }}>
                    <Text
                      style={{
                        ...styles.blueAndWhiteText,
                        opacity: "0.8",
                      }}
                    >
                      {extra}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        {/* RIGHT COLUMN */}
        <View style={{ width: "70%", height: "100%" }}>
          <View style={{ padding: "10px" }}>
            <Text
              style={{
                ...styles.blueAndWhiteText,
                color: "#000",
                borderBottom: "2px solid #e5e7eb",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              {resumeData.summary || ""}
            </Text>
            {/* EXPERIENCE */}
            <Text
              style={{
                ...styles.blueAndWhiteTitle,
                marginBottom: "5px",
              }}
            >
              {t.experience.toUpperCase()}
            </Text>
            <View>
              {(resumeData.experiences || []).map((experience, index) => (
                <View key={index} style={{ marginBottom: "10px" }}>
                  <View
                    style={{
                      ...styles.flexRow,
                      marginBottom: "2px",
                      gap: "6px",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.blueAndWhiteText,
                        color: fullNameColor,
                        fontWeight: "bold",
                      }}
                    >
                      {experience.position || ""}
                    </Text>
                    <Text
                      style={{
                        ...styles.blueAndWhiteText,
                        color: "#000",
                        fontWeight: "bold",
                        borderLeft: "1px solid #000",
                        paddingLeft: "6px",
                      }}
                    >
                      {experience.company || ""}
                    </Text>
                    <Text
                      style={{
                        ...styles.blueAndWhiteText,
                        color: fullNameColor,
                        fontWeight: "bold",
                        borderLeft: "1px solid #000",
                        paddingLeft: "6px",
                      }}
                    >
                      {experience.location || ""}
                    </Text>
                    <Text
                      style={{
                        ...styles.blueAndWhiteText,
                        color: "#000",
                        fontWeight: "bold",
                        borderLeft: "1px solid #000",
                        paddingLeft: "6px",
                      }}
                    >
                      {experience.duration || ""}
                    </Text>
                  </View>
                  <View>
                    {(experience.responsibilities || []).map(
                      (responsibility, resIndex) => (
                        <View
                          key={resIndex}
                          style={{
                            paddingLeft: "10px",
                            position: "relative",
                          }}
                        >
                          <Text
                            style={{
                              ...styles.blueAndWhiteText,
                              color: "#000",
                              marginBottom: "2px",
                              marginRight: "13px",
                              family: "NotoSansArabic",
                            }}
                          >
                            {responsibility || ""}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                </View>
              ))}
            </View>

            {/* EDUCATION */}
            <Text
              style={{
                ...styles.blueAndWhiteTitle,
                marginBottom: "5px",
              }}
            >
              {t.education.toUpperCase()}
            </Text>
            <View>
              {(resumeData.education || []).map((edu, index) => (
                <View key={index} style={{ marginBottom: "5px" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: "2px",
                    }}
                  >
                    <View style={{ width: "80%" }}>
                      <Text
                        style={{
                          ...styles.blueAndWhiteText,
                          fontWeight: "bold",
                          color: "#000",
                          marginBottom: "2px",
                          marginRight: "10px",
                          whiteSpace: "normal",
                          wordBreak: "break-all",
                        }}
                      >
                        {edu.institution || ""}
                      </Text>
                      <Text
                        style={{
                          ...styles.blueAndWhiteText,
                          display: "block",
                          marginLeft: "10px",
                          color: "#000",
                        }}
                      >
                        {edu.degree || ""}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          ...styles.blueAndWhiteText,
                          color: fullNameColor,
                        }}
                      >
                        {edu.year || ""}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* CERTIFICATES */}
            {sectionsVisibility.certificates && (
              <>
                <Text
                  style={{
                    ...styles.blueAndWhiteTitle,
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {t.certificates.toUpperCase()}
                </Text>
                {(resumeData.certificates || []).map((certificate, index) => (
                  <View key={index} style={{ marginBottom: "2px" }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            ...styles.blueAndWhiteText,
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          {certificate.name || ""}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            ...styles.blueAndWhiteText,
                            color: fullNameColor,
                          }}
                        >
                          {certificate.year || ""}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}

            {/* EXTRA DETAILED SECTIONS */}
            {sectionsVisibility.extraDetailedSection && (
              <>
                <Text
                  style={{
                    ...styles.blueAndWhiteTitle,
                    marginTop: "5px",
                    marginBottom: "5px",
                    textTransform: "capitalize",
                  }}
                >
                  {t.extraDetailedSections}
                </Text>
                <View>
                  {(resumeData.extraDetailedSection || []).map(
                    (extraDetail, index) => (
                      <View key={index} style={{ marginBottom: "5px" }}>
                        <Text
                          style={{
                            ...styles.blueAndWhiteText,
                            fontWeight: "bold",
                            marginBottom: "2px",
                            color: fullNameColor,
                          }}
                        >
                          {extraDetail.title || ""}
                        </Text>
                        {(extraDetail.details || []).map((detail, resIndex) => (
                          <View
                            key={resIndex}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "flex-start",
                              paddingLeft: "4px",
                              gap: "8px",
                              width: "100%",
                              marginBottom: "2px",
                            }}
                          >
                            <Text
                              style={{
                                ...styles.blueAndWhiteText,
                                color: "#000",
                                width: "100%",
                                flex: "1",
                                fontSize: "11px",
                              }}
                            >
                              {detail || ""}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </>
  );
};
