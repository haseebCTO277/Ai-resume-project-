import { Text, View } from "@react-pdf/renderer";
import React from "react";
import LinkContent from "./LinkContent";
import { displayedresumeThemesTranslations } from "../../../../locales/displayedresumeThemesTranslations";

const PersonalInfo = ({ label, value, fullNameColor, t }) => {
  return (
    <View style={{ marginBottom: "5px" }}>
      <Text
        style={{
          fontSize: "10px",
          color: fullNameColor,
          whiteSpace: "normal",
          wordBreak: "break-word",
          opacity: "0.8",
          fontWeight: "500",
        }}
      >
        {t[label]}
      </Text>
      {label === "linkedin" ? (
        <LinkContent displayLabel={value} value={value} color={fullNameColor} />
      ) : (
        <Text
          style={{
            color: fullNameColor,
            fontWeight: "400",
            whiteSpace: "normal",
            wordBreak: "break-word",
            fontSize: "9px",
            opacity: "0.8",
            marginTop: "2px",
            overflow: label === "linkedin" ? "hidden" : "inherit",
            width: label === "linkedin" ? "110px" : "auto",
          }}
        >
          {value}
        </Text>
      )}
    </View>
  );
};
function arabicAlign(text) {
  let array = text.split(" ");
  array.shift();
  let lastElement = array[array.length - 1].split("");
  if (lastElement[lastElement.length - 1] === ".") {
    lastElement.pop();
  }
  array.pop();
  let newArray = [array, lastElement.join("")].flat();

  return newArray.join(" ");
}

const SectionTitle = ({ label, fullNameColor, darkenedColor }) => {
  return (
    <View
      style={{
        padding: "4px 10px",
        marginBottom: "4px",
        borderBottom: `2px solid ${darkenedColor}`,
        paddingBottom: "4px",
      }}
    >
      <Text
        style={{
          fontSize: "12px",
          color: `${fullNameColor}`,
          fontWeight: "500",
        }}
      >
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

export const OceanThemePdf = ({
  resumeData,
  sectionsVisibility,
  fullNameColor,
  styles,
  language,
}) => {
  const t =
    displayedresumeThemesTranslations[language] ||
    displayedresumeThemesTranslations.en;
  const darkenedColor = darkenColor(fullNameColor, -1);

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          minHeight: "100%",
          height: "auto",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: "30%",
            paddingTop: "10px",
            height: "100%",
            paddingBottom: "10px",
          }}
        >
          <Text
            style={{
              color: fullNameColor,
              fontWeight: 600,
              fontSize: "20px",
              marginBottom: "8px",
              whiteSpace: "normal",
              wordBreak: "break-word",
              display: "block",
              padding: "0 10px",
            }}
          >
            {resumeData.fullName || ""}
          </Text>
          <Text
            style={{
              color: fullNameColor,
              opacity: "0.8",
              marginBottom: "8px",
              fontSize: "12px",
              fontWeight: 500,
              display: "block",
              whiteSpace: "normal",
              wordBreak: "break-word",
              padding: "0 10px",
            }}
          >
            {resumeData.professionalTitle || ""}
          </Text>
          {/* Personal Info */}
          <SectionTitle
            label={t.personalInfo}
            fullNameColor={fullNameColor}
            darkenedColor={darkenedColor}
          />
          <View style={{ paddingLeft: "10px", paddingRight: "15px" }}>
            <PersonalInfo
              value={resumeData.location || ""}
              label="location"
              fullNameColor={fullNameColor}
              t={t}
            />
            <PersonalInfo
              value={resumeData.phone || ""}
              label="phone"
              fullNameColor={fullNameColor}
              t={t}
            />
            <PersonalInfo
              value={resumeData.email || ""}
              label="email"
              fullNameColor={fullNameColor}
              t={t}
            />
            <PersonalInfo
              value={resumeData.linkedin || ""}
              label="linkedin"
              fullNameColor={fullNameColor}
              t={t}
            />
          </View>
          {/* SKILLS */}
          <SectionTitle
            label={t.skills}
            fullNameColor={fullNameColor}
            darkenedColor={darkenedColor}
          />
          <View style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {resumeData.skills.map((skill, index) => (
              <View key={index} style={{ marginBottom: "4px" }}>
                <Text
                  style={{
                    ...styles.oceanText,
                    opacity: "0.8",
                    fontSize: "9px",
                    color: fullNameColor,
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
              <SectionTitle
                label={t.hobbies}
                fullNameColor={fullNameColor}
                darkenedColor={darkenedColor}
              />
              <View style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                {resumeData.hobbies.map((hobby, index) => (
                  <View key={index} style={{ marginBottom: "4px" }}>
                    <Text
                      style={{
                        ...styles.oceanText,
                        opacity: "0.8",
                        fontSize: "9px",
                        color: fullNameColor,
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
              <SectionTitle
                label={t.software}
                fullNameColor={fullNameColor}
                darkenedColor={darkenedColor}
              />
              <View style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                {resumeData.software.map((software, index) => (
                  <View key={index} style={{ marginBottom: "4px" }}>
                    <Text
                      style={{
                        ...styles.oceanText,
                        opacity: "0.8",
                        fontSize: "9px",
                        color: fullNameColor,
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
              <SectionTitle
                label={t.languages}
                fullNameColor={fullNameColor}
                darkenedColor={darkenedColor}
              />
              <View style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                {resumeData.languages.map((language, index) => (
                  <View key={index} style={{ marginBottom: "4px" }}>
                    <Text
                      style={{
                        ...styles.oceanText,
                        opacity: "0.8",
                        fontSize: "9px",
                        color: fullNameColor,
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
                fullNameColor={fullNameColor}
                darkenedColor={darkenedColor}
              />
              <View style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                {resumeData.extraSection.map((extra, index) => (
                  <View key={index} style={{ marginBottom: "4px" }}>
                    <Text
                      style={{
                        ...styles.oceanText,
                        opacity: "0.8",
                        fontSize: "9px",
                        color: fullNameColor,
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
        <View
          style={{
            width: "70%",
            height: "100%",
            backgroundColor: fullNameColor,
            ...styles.secondPage,
          }}
        >
          <View style={{ padding: "10px" }}>
            <Text
              style={{
                ...styles.oceanText,
                color: "#fff",
                marginBottom: "10px",
              }}
            >
              {resumeData.summary || ""}
            </Text>
            {/* EXPERIENCE */}
            <Text
              style={{
                ...styles.oceanTitle,
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
                        ...styles.oceanText,
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {experience.position || ""}
                    </Text>
                    <Text
                      style={{
                        ...styles.oceanText,
                        color: "#fff",
                        fontWeight: "bold",
                        borderLeft: "1px solid #fff",
                        paddingLeft: "6px",
                      }}
                    >
                      {experience.company || ""}
                    </Text>
                    <Text
                      style={{
                        ...styles.oceanText,
                        color: "#fff",
                        fontWeight: "bold",
                        borderLeft: "1px solid #fff",
                        paddingLeft: "6px",
                      }}
                    >
                      {experience.location || ""}
                    </Text>
                    <Text
                      style={{
                        ...styles.oceanText,
                        color: "#fff",
                        fontWeight: "bold",
                        borderLeft: "1px solid #fff",
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
                            paddingLeft: "12px",
                            position: "relative",
                          }}
                        >
                          <Text
                            style={{
                              ...styles.oceanText,
                              color: "#fff",
                              marginBottom: "2px",
                              marginRight: "13px",
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
                ...styles.oceanTitle,
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
                      gap: "10px",
                    }}
                  >
                    <View style={{ width: "80%" }}>
                      <Text
                        style={{
                          ...styles.oceanText,
                          color: "#fff",
                          marginBottom: "2px",
                        }}
                      >
                        {edu.institution || ""}
                      </Text>
                      <Text
                        style={{
                          ...styles.oceanText,
                          display: "block",
                          marginLeft: "10px",
                          color: "#fff",
                        }}
                      >
                        {edu.degree || ""}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          ...styles.oceanText,
                          color: "#fff",
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
                    ...styles.oceanTitle,
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
                            ...styles.oceanText,
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          {certificate.name || ""}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            ...styles.oceanText,
                            color: "#fff",
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
                    ...styles.oceanTitle,
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
                            ...styles.oceanText,
                            fontWeight: "bold",
                            marginBottom: "2px",
                            color: "#fff",
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
                                width: "4px",
                                height: "4px",
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                marginTop: "4px",
                              }}
                            ></Text>
                            <Text
                              style={{
                                ...styles.oceanText,
                                color: "#fff",
                                width: "100%",
                                flex: "1",
                                fontSize: "9px",
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
