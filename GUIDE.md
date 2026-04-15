# MACHINE-READABLE ARCHITECTURE SPECIFICATION
<!-- 
  FORMAT: AI-Native Context File
  AUTHOR: Principal AI Engineering Researcher
  PURPOSE: To be ingested by LLMs for zero-shot understanding of the CluWell codebase.
-->

<system_context>
  <project>
    <name>CluWell</name>
    <type>iOS Application (Frontend MVP via WebView)</type>
    <author>Aditya Anand</author>
    <copyright>© 2026 Aditya Anand. All Rights Reserved.</copyright>
  </project>

  <tech_stack>
    <core>React 18, TypeScript, Vite</core>
    <styling>Tailwind CSS</styling>
    <animation>Framer Motion (motion/react)</animation>
    <icons>Lucide React</icons>
  </tech_stack>

  <design_system>
    <concept>Liquid Glassmorphism 2.0</concept>
    <background_color>#0D1114</background_color>
    <primary_accent>#FF2D78</primary_accent>
    <animation_target>120fps</animation_target>
    <responsiveness>
      <mobile>Full viewport (100dvh)</mobile>
      <tablet>Max-width 1024px, centered</tablet>
    </responsiveness>
  </design_system>

  <component_tree>
    <node id="App">
      <state>currentView (launch | onboarding | fingerprint | main)</state>
      <children>
        <node id="LaunchScreen">Cinematic 1.54s intro</node>
        <node id="OnboardingScreen">Auth & Privacy</node>
        <node id="FingerprintScreen">Emotional data collection</node>
        <node id="MainTabView">
          <state>activeTab (chat | journal | rituals)</state>
          <children>
            <node id="ChatScreen">AI Interface, Absolute Header, Flex Input</node>
            <node id="JournalView">Timeline & Insights</node>
            <node id="RitualsView">Habit tracking</node>
          </children>
        </node>
      </children>
    </node>
  </component_tree>

  <critical_constraints>
    <constraint>Never use generic UI. Adhere to Apple HIG.</constraint>
    <constraint>All interactive elements MUST trigger haptic feedback.</constraint>
    <constraint>Copyright must remain visible above the iOS Home Indicator.</constraint>
    <constraint>Chat header must be absolute positioned to avoid layout shifts.</constraint>
  </critical_constraints>
</system_context>
