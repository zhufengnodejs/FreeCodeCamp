window.common = (function(global) {
  const {
    Rx: { Subject, Observable },
    CodeMirror,
    emmetCodeMirror,
    common = { init: [] }
  } = global;

  const { challengeType = '0', challengeTypes } = common;

  if (
    !CodeMirror ||
    challengeType === challengeTypes.BASEJUMP ||
    challengeType === challengeTypes.ZIPLINE ||
    challengeType === challengeTypes.VIDEO ||
    challengeType === challengeTypes.STEP ||
    challengeType === challengeTypes.HIKES
  ) {
    common.editor = {};
    return common;
  }

  var htmlEditor = CodeMirror.fromTextArea(
    document.getElementById('htmlCode'),
    {
      lint: true,
      lineNumbers: true,
      mode: 'text/html',
      theme: 'monokai',
      runnable: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      scrollbarStyle: 'null',
      lineWrapping: true,
      gutters: ['CodeMirror-lint-markers']
    }
  );

  var cssEditor = CodeMirror.fromTextArea(
    document.getElementById('cssCode'),
    {
      lint: true,
      lineNumbers: true,
      mode: 'css',
      theme: 'monokai',
      runnable: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      scrollbarStyle: 'null',
      lineWrapping: true,
      gutters: ['CodeMirror-lint-markers']
    }
  );

  var jsEditor = CodeMirror.fromTextArea(
    document.getElementById('jsCode'),
    {
      lint: true,
      lineNumbers: true,
      mode: 'javascript',
      theme: 'monokai',
      runnable: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      scrollbarStyle: 'null',
      lineWrapping: true,
      gutters: ['CodeMirror-lint-markers']
    }
  );

  var editor = CodeMirror.fromTextArea(
    document.getElementById('codeEditor'),
    {
      lint: true,
      lineNumbers: true,
      mode: 'javascript',
      theme: 'monokai',
      runnable: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      scrollbarStyle: 'null',
      lineWrapping: true,
      gutters: ['CodeMirror-lint-markers']
    }
  );

  editor.setSize('100%', 'auto');

  common.editorExecute$ = new Subject();
  common.editorKeyUp$ = Observable.fromEventPattern(
    (handler) => editor.on('keyup', handler),
    (handler) => editor.off('keyup', handler)
  );

  editor.setOption('extraKeys', {
    Tab: function(cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection('add');
      } else {
        var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces);
      }
    },
    'Shift-Tab': function(cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection('subtract');
      } else {
        var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces);
      }
    },
    'Ctrl-Enter': function() {
      common.editorExecute$.onNext();
      return false;
    },
    'Cmd-Enter': function() {
      common.editorExecute$.onNext();
      return false;
    }
  });


  var info = editor.getScrollInfo();

  var after = editor.charCoords({
    line: editor.getCursor().line + 1,
    ch: 0
  }, 'local').top;

  if (info.top + info.clientHeight < after) {
    editor.scrollTo(null, after - info.clientHeight + 3);
  }

  if (emmetCodeMirror) {
    emmetCodeMirror(
      editor,
      {
        'Cmd-E': 'emmet.expand_abbreviation',
        Tab: 'emmet.expand_abbreviation_with_tab',
        Enter: 'emmet.insert_formatted_line_break_only'
      }
    );
  }
  common.init.push(function() {
    let editorValue;
    if (common.codeUri.isAlive()) {
      editorValue = common.codeUri.parse();
    } else {
      editorValue = common.codeStorage.isAlive(common.challengeName) ?
        common.codeStorage.getStoredValue(common.challengeName) :
        common.seed;
    }

    editor.setValue(common.replaceSafeTags(editorValue));
    editor.refresh();
  });

  common.editor = editor;
  common.htmlCode = htmlEditor;
  common.cssCode = cssEditor;
  common.jsCode = jsEditor;

  common.init.push(function(){
    $(document).ready(function(){
      $(common.htmlCode.display.wrapper).addClass('partEditor');
      $(common.htmlCode.display.wrapper).addClass('htmlCode');

      $(common.cssCode.display.wrapper).addClass('partEditor');
      $(common.cssCode.display.wrapper).addClass('cssCode');
      $('.cssCode').css('margin-top', "-" + $(common.cssCode.display.wrapper).css('height'));

      $(common.jsCode.display.wrapper).addClass('partEditor');
      $(common.jsCode.display.wrapper).addClass('jsCode');
      $('.jsCode').css('margin-top', "-" + $(common.jsCode.display.wrapper).css('height'));
    });
  });

  common.init.push(function(){
    $(document).ready(function(){
      $($('.editorHeader').children()[0]).css('background-color', 'green').css('color', 'white');
      $($('.editorHeader').children()[0]).on('click', function(){
        $('.htmlCode').css('z-index', '2');
        $('.cssCode').css('z-index', '1');
        $('.jsCode').css('z-index', '1')
        $($('.editorHeader').children()[0]).css('background-color', 'green').css('color', 'white');
        $($('.editorHeader').children()[1]).css('background-color', '').css('color', 'black');
        $($('.editorHeader').children()[2]).css('background-color', '').css('color', 'black');
      });
      $($('.editorHeader').children()[1]).on('click', function(){
        $('.htmlCode').css('z-index', '1');
        $('.cssCode').css('z-index', '2');
        $('.jsCode').css('z-index', '1');
        $($('.editorHeader').children()[0]).css('background-color', '').css('color', 'black');
        $($('.editorHeader').children()[1]).css('background-color', 'green').css('color', 'white');
        $($('.editorHeader').children()[2]).css('background-color', '').css('color', 'black');
      });
      $($('.editorHeader').children()[2]).on('click', function(){
        $('.htmlCode').css('z-index', '1');
        $('.cssCode').css('z-index', '1');
        $('.jsCode').css('z-index', '2');
        $($('.editorHeader').children()[0]).css('background-color', '').css('color', 'black');
        $($('.editorHeader').children()[1]).css('background-color', '').css('color', 'black');
        $($('.editorHeader').children()[2]).css('background-color', 'green').css('color', 'white');
      });
    });
  });

  return common;
}(window));
