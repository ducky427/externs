(set-env!
 :resource-paths #{"resources"}
 :dependencies '[[cljsjs/boot-cljsjs "0.5.1"  :scope "test"]])

(require '[cljsjs.boot-cljsjs.packaging :refer :all])

(def +lib-version+ "{{ lib_version }}")
(def +version+ (str +lib-version+ "-{{ version }}"))

(task-options!
 pom {:project     'cljsjs/{{package}}
      :version     +version+
      :description "{{ description }}"
      :url         "{{ url }}"
      :scm         {:url "{{ scm }}"}
      :license     {"MIT" "http://opensource.org/licenses/MIT"
                    "Apache 2.0" "http://www.apache.org/licenses/LICENSE-2.0"}})

(deftask package []
  (comp
   (download  :url      "{{ code_loc }}"
              :checksum "{{ checksum }}")
   (sift      :move     { #"^{{ file }}"
                         "cljsjs/{{ package }}/development/{{ package }}.inc.js"})
   {% if file_min %}
   (download  :url      "{{ code_loc_min }}"
              :checksum "{{ checksum_min }}")
   (sift      :move     { #"^{{ file_min }}"
                         "cljsjs/{{ package }}/production/{{ package }}.min.inc.js"})
   {% else %}
   (minify :in "cljsjs/{{ package }}/development/{{ package }}.inc.js"
           :out "cljsjs/{{ package }}/production/{{ package }}.min.inc.js")
   {% endif %}
   (sift      :include  #{ #"^cljsjs"})
   (deps-cljs :name     "cljsjs.{{ package }}")))
