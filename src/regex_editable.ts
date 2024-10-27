import { regex } from "regex";

export default regex`
	(?<node>
		# Expression
		\{\{
			(?<startDelimiterEx>\g<DELIMITER>?)\s*
				(?<expression>(?>\g<ESCAPEQUOTES> | \g<ALLSYMBOLS>)*?)
			\s*(?<endDelimiterEx>\g<DELIMITER>?)
		\}\}
		|
		# Statement
		\{%
			(?<startDelimiter>\g<DELIMITER>?)\s*
				(?<statement>
					(?<keyword>\w+)
					(?>\g<ESCAPEQUOTES> | \g<ALLSYMBOLS>)*?
				)
			\s*(?<endDelimiter>\g<DELIMITER>?)
		%\}
		|
		# Ignore block
		(?<ignoreBlock>
			(<!--\s*prettier-ignore-start\s*--> | \{\#\s*prettier-ignore-start\s*\#\})
				\g<EVERYTHING>
			(<!--\s*prettier-ignore-end\s*--> | \{\#\s*prettier-ignore-end\s*\#\})
		)
		|
		# Comment
		(?<comment>\{\#\g<EVERYTHING>\#\})
	)

	(?(DEFINE)
		(?<EVERYTHING>		\g<ALLSYMBOLS>*?)
		(?<ALLSYMBOLS>		[\s\S])
		(?<DELIMITER>			[\-+])
		(?<ESCAPEQUOTES>	'[^']*'|"[^"]*")
	)
`;
