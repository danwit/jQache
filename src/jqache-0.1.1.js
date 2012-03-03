/* jQache - BSD 3-Clause License - See LICENSE */
;( function ( $ ) {
    
    $._jqache = {};
    $._assigned = Array();
    $._jqns = Array();
    $._jqnsAssigned = Array();
 
    $.q = function ( selector, clear ) {
        
        var clear = ( typeof clear !== "undefined" ) ? clear : false;

        if ( typeof $._jqache[selector] !== "undefined" && !clear ) {
            return $._jqache[selector];
        } else {

            if ( typeof $._assigned[selector] !== "undefined" ) {
                return $._jqache[selector] = $( $._assigned[selector] );    
            }

            return $._jqache[selector] = $( selector );
        }
    };

    $.q.assign = function ( options ) {
        
        var defaults = {
            interval: 0,
            namespace: undefined
        };

        if ( typeof options.selector === "undefined" )
            return false;
            
        if ( typeof options.name === "undefined")
            options.name = options.selector;

        options = $.extend( {}, defaults, options );

        if ( typeof options.namespace === "undefined" ) {

            $._jqache[options.name] = $( options.selector );
            $._assigned[options.name] = options.selector;

            if ( options.interval > 0 ) {

                window.setInterval( function(){
                    
                    $._jqache[options.name] = $( options.selector );
                }, ( options.interval*1000 ) );
            };

            return $._jqache[options.name];
        } else {

            $._jqache[options.namespace] = ( typeof $._jqache[options.namespace] !== "undefined" )
                ? $._jqache[options.namespace]
                : Array();
            $._jqache[options.namespace][options.name] = $( options.selector );
        
            $._jqns[options.namespace] = ( typeof $._jqns[options.namespace] !== "undefined" )
                ? $._jqns[options.namespace]
                : Array();
            $._jqns[options.namespace].push( options.name );
        
            $._jqnsAssigned[options.namespace] = ( typeof $._jqnsAssigned[options.namespace] !== "undefined" )
                ? $._jqnsAssigned[options.namespace]
                : Array();
            $._jqnsAssigned[options.namespace][options.name] = options.selector;

            if ( options.interval > 0 ) {
                
                window.setInterval( function(){
                    $._jqache[options.namespace][options.name] = $( options.selector );
                }, ( options.interval*1000 ) );
            }

            if ( typeof $.q[options.namespace] !== "function" ) {
                
                $.q[options.namespace] = function ( selector, clear ) {

                    if ( typeof selector !== "undefined" ) {

                        var clear = ( typeof clear !== "undefined" ) ? clear : false;
                        
                        if ( typeof $._jqache[options.namespace][selector] !== "undefined"&& !clear ) {
                            return $._jqache[options.namespace][selector];
                        } else if ( typeof $._jqache[options.namespace][selector] !== "undefined"&& clear ) {
                            return $._jqache[options.namespace][selector] = $( $._jqnsAssigned[options.namespace][selector] );
                        }

                    } else {

                        var result = Array();

                        for ( var i in $._jqache[options.namespace] ) {  
                            if ( $._jqache[options.namespace].hasOwnProperty( i ) ) {  
                                result.push( $.q[options.namespace]( i )[0] );
                            }
                        }  

                        return $( result );
                    }
                }
            }
        }
    };

    $.q.clear = function ( ns ) {

        if ( typeof ns === "undefined" ) {
            
            $.each( $._jqache, function ( i, val ) {

                if ( typeof $._jqns[i] === "undefined" ) {
                    $.q( i, true )
                } else {
                    $.q.clear( i );
                }
            });
        } else {

            $.each( $._jqns[ns], function ( i, val ) {

                $.q[ns]( val, true );
            });
        }
    };

})( jQuery )
