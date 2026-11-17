(function(){
  "use strict";
  var MS = 864e5;
  var now = new Date(); now.setHours(0,0,0,0);

  /* --- date stamp --- */
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var stamp = document.getElementById("today-stamp");
  if (stamp) stamp.textContent = now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear();

  /* --- live deadline chips --- */
  document.querySelectorAll(".chip[data-deadline]").forEach(function(el){
    var parts = el.getAttribute("data-deadline").split("-");
    var d = new Date(+parts[0], +parts[1]-1, +parts[2]);
    var days = Math.round((d - now)/MS);
    var cls, txt;
    if (days < 0)        { cls="c-closed";  txt="Closed"; }
    else if (days === 0) { cls="c-closing"; txt="Closes today"; }
    else if (days === 1) { cls="c-closing"; txt="1 day left"; }
    else if (days <= 30) { cls="c-closing"; txt=days + " days left"; }
    else                 { cls="c-open";    txt="Open"; }
    el.className = "chip " + cls;
    el.textContent = txt;
    el.setAttribute("title", "Deadline " + d.toDateString());
  });

  /* --- ticker: hide once the named deadline has passed --- */
  var tickerDate = new Date(2026,7,31);
  if (now > tickerDate){
    var tk = document.querySelector(".ticker");
    if (tk) tk.style.display = "none";
  }

  /* --- cycle bar: today marker --- */
  var start = new Date(2026,6,1), end = new Date(2027,4,31);
  var line = document.getElementById("nowline");
  if (line){
    if (now < start || now > end){ line.style.display = "none"; }
    else {
      var pct = ((now - start) / (end - start)) * 100;
      line.style.left = "calc(170px + 14px + (100% - 184px) * " + (pct/100) + ")";
    }
  }

  /* --- copy buttons --- */
  document.querySelectorAll(".copy").forEach(function(btn){
    btn.addEventListener("click", function(){
      var q = btn.parentElement.querySelector(".qt");
      if (!q) return;
      var done = function(){
        btn.textContent = "Copied";
        btn.classList.add("done");
        setTimeout(function(){ btn.textContent = "Copy"; btn.classList.remove("done"); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(q.textContent).then(done, function(){});
      } else {
        var ta = document.createElement("textarea");
        ta.value = q.textContent; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch(e){}
        document.body.removeChild(ta);
      }
    });
  });

  /* --- scrollspy --- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".rail a"));
  var secs  = links.map(function(a){ return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && secs.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (!en.isIntersecting) return;
        links.forEach(function(a){
          a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-15% 0px -75% 0px" });
    secs.forEach(function(s){ io.observe(s); });
  }
})();
