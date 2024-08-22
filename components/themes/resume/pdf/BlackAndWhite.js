import { Path, Svg, Text, View, Link } from "@react-pdf/renderer";
import React from "react";
import { displayedresumeThemesTranslations } from '../../../../locales/displayedresumeThemesTranslations';

const icons = {
  email: "M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z",
  location: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z",
  linkedin: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
  phone: "M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z",
};

const SocialIcons = ({ iconType, label, fullNameColor }) => {
  const displayLabel =
    iconType === "linkedin" ? label.split("/in/")[1] || label : label;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
      <Svg viewBox="0 0 512 512" style={{ width: 11, height: 11 }}>
        <Path d={icons[iconType]} fill={fullNameColor} />
      </Svg>
      <Text style={{ fontSize: 11, marginLeft: 5 }}>
        {displayLabel}
      </Text>
    </View>
  );
};

export const BlackAndWhitePdf = ({
  resumeData,
  sectionsVisibility,
  fullNameColor,
  styles,
  language
}) => {
  const t = displayedresumeThemesTranslations[language] || displayedresumeThemesTranslations.en;
  const isRTL = language === 'ar';

  const rtlFlexRow = isRTL ? { flexDirection: 'row-reverse' } : {};
  const rtlTextAlign = isRTL ? { textAlign: 'right' } : { textAlign: 'left' };
  const rtlMargin = isRTL ? { marginRight: 10 } : { marginLeft: 10 };

  const sectionTitleStyle = {
    ...styles.title,
    fontSize: 12,
    ...rtlTextAlign,
    borderBottom: "1px solid rgb(212, 211, 211)",
    paddingBottom: 2,
    paddingTop: 5,
  };

  return (
    <View style={{ padding: 15, direction: isRTL ? 'rtl' : 'ltr' }}>
      <View>
        <Text style={{
          ...styles.textCenter,
          fontSize: 24,
          fontWeight: '500',
          paddingBottom: 4,
          color: fullNameColor,
        }}>
          {resumeData.fullName || ""}
        </Text>
        <Text style={{
          ...styles.textCenter,
          fontSize: 18,
          fontWeight: '400',
          color: "#000",
          paddingBottom: 10,
        }}>
          {resumeData.professionalTitle || ""}
        </Text>
      </View>

      <View style={{
        ...styles.flexRow,
        ...rtlFlexRow,
        flexWrap: 'wrap',
        justifyContent: isRTL ? 'flex-end' : 'flex-start',
        paddingBottom: 10,
      }}>
        <SocialIcons
          iconType="linkedin"
          label={resumeData.linkedin || ""}
          fullNameColor={fullNameColor}
        />
        <SocialIcons
          iconType="location"
          label={resumeData.location}
          fullNameColor={fullNameColor}
        />
        <SocialIcons
          iconType="phone"
          label={resumeData.phone}
          fullNameColor={fullNameColor}
        />
        <SocialIcons
          iconType="email"
          label={resumeData.email}
          fullNameColor={fullNameColor}
        />
      </View>

      <View style={{ paddingBottom: 10 }}>
        <Text style={sectionTitleStyle}>{t.summary.toUpperCase()}</Text>
        <Text style={{
          whiteSpace: "pre-line",
          wordBreak: "break-all",
          fontSize: 11,
          color: "#000",
          fontWeight: "400",
          ...rtlTextAlign,
          paddingTop: 5,
        }}>
          {resumeData.summary}
        </Text>
      </View>

      <View style={{ paddingBottom: 10 }}>
        <Text style={sectionTitleStyle}>{t.experience.toUpperCase()}</Text>
        {(resumeData.experiences || []).map((experience, index) => (
          <View key={index} style={{ paddingTop: 5 }}>
            <View style={{ ...styles.flexRow, ...rtlFlexRow, gap: 2 }}>
              <Text style={{ ...styles.text, fontWeight: "700", color: fullNameColor, fontSize: 11 }}>
                {experience.position || ""}
              </Text>
              <Text style={{ ...styles.text, fontWeight: "700", fontSize: 11, paddingLeft: 5, paddingRight: 5 }}>
                {experience.company || ""}
              </Text>
              <Text style={{ ...styles.text, fontWeight: "700", color: fullNameColor, fontSize: 11, paddingLeft: 5, paddingRight: 5 }}>
                {experience.location || ""}
              </Text>
              <Text style={{ ...styles.text, fontWeight: "700", fontSize: 11, paddingLeft: 5, paddingRight: 5 }}>
                {experience.duration || ""}
              </Text>
            </View>
            <View style={{ ...rtlMargin, paddingTop: 2 }}>
              {(experience.responsibilities || []).map((responsibility, resIndex) => (
                <View key={resIndex} style={{ flexDirection: isRTL ? 'row-reverse' : 'row', paddingTop: 2 }}>
                  <Text style={{ ...styles.text, fontSize: 11, lineHeight: 1.3, ...rtlTextAlign, flex: 1 }}>
                    {responsibility || ""}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={{ paddingBottom: 10 }}>
        <Text style={sectionTitleStyle}>{t.education.toUpperCase()}</Text>
        {(resumeData.education || []).map((edu, index) => (
          <View key={index} style={{ paddingTop: 5 }}>
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 11, color: "#000", fontWeight: "700", ...rtlTextAlign }}>
                {edu.institution || ""}
              </Text>
              <Text style={{ fontSize: 11, color: fullNameColor, fontWeight: "700" }}>
                {edu.year || ""}
              </Text>
            </View>
            <Text style={{ ...styles.text, fontSize: 10, ...rtlMargin, fontStyle: "italic", ...rtlTextAlign }}>
              {edu.degree || ""}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ paddingBottom: 10 }}>
        <Text style={sectionTitleStyle}>{t.skills.toUpperCase()}</Text>
        <View style={{ ...styles.flexRow, ...rtlFlexRow, flexWrap: 'wrap', paddingTop: 5 }}>
          {resumeData.skills.map((skill, index) => (
            <View key={index} style={{
              padding: "2px 5px",
              border: `1px solid ${fullNameColor}`,
              borderRadius: 50,
              margin: 2,
            }}>
              <Text style={{ ...styles.text, fontSize: 11 }}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {sectionsVisibility.hobbies && (
        <View style={{ paddingBottom: 10 }}>
          <Text style={sectionTitleStyle}>{t.hobbies.toUpperCase()}</Text>
          <View style={{ ...styles.flexRow, ...rtlFlexRow, flexWrap: 'wrap', paddingTop: 5 }}>
            {resumeData.hobbies.map((hobby, index) => (
              <View key={index} style={{
                padding: "2px 5px",
                border: `1px solid ${fullNameColor}`,
                borderRadius: 50,
                margin: 2,
              }}>
                <Text style={{ ...styles.text, fontSize: 11 }}>{hobby}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {sectionsVisibility.software && (
        <View style={{ paddingBottom: 10 }}>
          <Text style={sectionTitleStyle}>{t.software.toUpperCase()}</Text>
          <View style={{ ...styles.flexRow, ...rtlFlexRow, flexWrap: 'wrap', paddingTop: 5 }}>
            {resumeData.software.map((software, index) => (
              <View key={index} style={{
                padding: "2px 5px",
                border: `1px solid ${fullNameColor}`,
                borderRadius: 50,
                margin: 2,
              }}>
                <Text style={{ ...styles.text, fontSize: 11 }}>{software}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {sectionsVisibility.languages && (
        <View style={{ paddingBottom: 10 }}>
          <Text style={sectionTitleStyle}>{t.languages.toUpperCase()}</Text>
          <View style={{ ...styles.flexRow, ...rtlFlexRow, flexWrap: 'wrap', paddingTop: 5 }}>
            {resumeData.languages.map((language, index) => (
              <View key={index} style={{
                padding: "2px 5px",
                border: `1px solid ${fullNameColor}`,
                borderRadius: 50,
                margin: 2,
              }}>
                <Text style={{ ...styles.text, fontSize: 11 }}>{language}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {sectionsVisibility.certificates && (
        <View style={{ paddingBottom: 10 }}>
          <Text style={sectionTitleStyle}>{t.certificates.toUpperCase()}</Text>
          {(resumeData.certificates || []).map((certificate, index) => (
            <View key={index} style={{
              ...styles.flexRow,
              ...rtlFlexRow,
              justifyContent: "space-between",
              paddingTop: 5,
            }}>
              <Text style={{ ...styles.text, fontSize: 11, ...rtlTextAlign, flex: 1 }}>
                {certificate.name || ""}
              </Text>
              <Text style={{ ...styles.text, color: fullNameColor, fontSize: 11 }}>
                {certificate.year || ""}
              </Text>
            </View>
          ))}
        </View>
      )}

      {sectionsVisibility.extraSection && (
        <View style={{ paddingBottom: 10 }}>
          <Text style={sectionTitleStyle}>{t.extraSections.toUpperCase()}</Text>
          {resumeData.extraSection.map((extra, index) => (
            <Text key={index} style={{
              ...styles.text,
              borderBottom: "1px solid rgb(204, 204, 204)",
              paddingTop: 5,
              paddingBottom: 1,
              fontSize: 11,
              ...rtlTextAlign,
            }}>
              {extra}
            </Text>
          ))}
        </View>
      )}

      {sectionsVisibility.extraDetailedSection && (
        <View style={{ paddingBottom: 10 }}>
          <Text style={sectionTitleStyle}>{t.extraDetailedSections.toUpperCase()}</Text>
          {(resumeData.extraDetailedSection || []).map((extraDetail, index) => (
            <View key={index} style={{ paddingTop: 5 }}>
              <Text style={{
                fontSize: 11,
                color: "#000",
                fontWeight: "700",
                borderBottom: "1px solid rgb(204, 204, 204)",
                paddingBottom: 1,
                ...rtlTextAlign,
              }}>
                {extraDetail.title || ""}
              </Text>
              <View style={{ ...rtlMargin, paddingTop: 2 }}>
                {(extraDetail.details || []).map((detail, resIndex) => (
                  <View key={resIndex} style={{ flexDirection: isRTL ? 'row-reverse' : 'row', paddingTop: 2 }}>
                    <Text style={{
                      ...styles.text,
                      fontSize: 11,
                      ...rtlTextAlign,
                      flex: 1,
                    }}>
                      {detail || ""}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
